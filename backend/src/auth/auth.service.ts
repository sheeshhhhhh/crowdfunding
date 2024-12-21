import { BadRequestException, GoneException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';
import { Prisma } from '@prisma/client';
import { Profile } from 'passport-facebook';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async validateFacebook(user: Profile) {
        const getUser = await this.prisma.user.findFirst({
            where: {
                email: user.emails[0].value
            }
        }) 

        if(!getUser) {
            const username = user.displayName || (user.name.givenName + user.name.familyName)

            const createUser = await this.prisma.user.create({
                data: {
                    username: username,
                    email: user.emails[0].value,
                    profile: user.photos[0].value
                }
            })
             
            return this.login(createUser)
        }

        return this.login(getUser)
    }

    async validateGoogle(user: any) {
        const getUser = await this.prisma.user.findFirst({
            where: {
                email: user?.emails[0]?.value
            }
        }) 

        if(!getUser) {
            const createUser = await this.prisma.user.create({
                data: {
                    username: user.displayName,
                    email: user.emails[0].value,
                    profile: user.photos[0].value
                }
            })
             
            return this.login(createUser)
        }

        return this.login(getUser)
    }

    async validateUser({ username, password }: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if(!user) {
            return {
                user: null,
                name: 'username',
                message: 'username not found'
            }
        }

        const verifyPassword = await bcrypt.compare(password, user.password)

        if(!verifyPassword) {
            return {
                user: null,
                name: 'password',
                message: 'wrong password'
            }
        }

        return { 
            user, 
            name: '', 
            message: 'Successfully log in'
        }
    }

    async login(user: any) {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            // role: user.role
            createdAt: user.createdAt
        }
        const accessToken = this.jwtService.sign(payload)
        const refreshToken = await this.generateRefreshToken(user.id)

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }

    async generateRefreshToken(userId: any) {

        if(!userId) {
            throw new GoneException('userId does not exist')
        }

        // deleting all existign refresh token from userId
        const deleteRefreshToken = await this.prisma.refreshToken.deleteMany({
            where: {
                userId
            }
        })

        // saving new refresh token
        const refrestToken = uuid();
        const saveRefreshToken = await this.prisma.refreshToken.create({
            data: {
                token: refrestToken,
                userId: userId,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14) // 2 weeks
            }
        })

        return refrestToken;
    }

    async validateRefreshToken(refreshToken: string) {
        if(!refreshToken) {
            throw new BadRequestException('refreshToken is required')
        }

        const getRefreshToken = await this.prisma.refreshToken.findFirst({
            where: {
                AND: [
                    {
                        token: refreshToken
                    },
                    {
                        expiresAt: {
                            gt: new Date()
                        }
                    }
                ]
            }
        })

        if (!getRefreshToken) {
            throw new GoneException({
                name: 'refreshToken',
                message: 'refresh token is invalid'
            })
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id: getRefreshToken.userId
            }
        })

        return this.login(user);
    }

    async signup( { username, email, password, confirmPassword } : SignUpDto) {  
            
        if(password !== confirmPassword) {
            throw new BadRequestException({
                name: 'confirmPassword',
                message: 'Password and Confirm Password must match'
            })
        }

        const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS) || 10);

        try {
            const createUser =  await this.prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashPassword
                }
            });

            return createUser;
        } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new BadRequestException({
                        name: error.meta.target[0],
                        message: `${error.meta.target[0] } already exists`
                    });
                }
            }
            throw new InternalServerErrorException();
        }

    }

}

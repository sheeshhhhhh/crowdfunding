import {
    BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RequestUser } from 'src/guards/user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  UpdateBillingInformationDto,
  UpdatePasswordDto,
  UpdateUserProfileDto,
} from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUpload: FileUploadService,
  ) {}

    async getInitialData(user: RequestUser) {
        try {
            const initialData = await this.prisma.user.findFirst({
                where: {
                    id: user.id,
                },
                select: {
                    id: true,
                    billingInfo: true,
                    username: true,
                    email: true,
                    profile: true,
                },
            });

            if (!initialData) {
                throw new NotFoundException('User not found');
            }

            return initialData;
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong');
        }
    }

    async updatePassword(
        user: RequestUser,
        { currentPassword, newPassword, confirmPassword }: UpdatePasswordDto,
    ) {
        if (newPassword !== confirmPassword) {
            throw new InternalServerErrorException('Passwords do not match');
        }

        const getUserPassword = await this.prisma.user.findFirst({
            where: {
                id: user.id,
            },
            select: {
                password: true,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, getUserPassword.password);

        if (!isPasswordValid) {
            throw new BadRequestException({name: 'currentPassword', message: 'wrong password'});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedPassword,
            },
        });

        return {
            message: 'Password updated successfully',
        };
    }

  // update or create
    async updateBillingInformation(
        user: RequestUser,
        billingInfo: UpdateBillingInformationDto,
    ) {
        const updateBillingInformation = await this.prisma.billingInformation.upsert({
            where: {
                userId: user.id,
            },
            create: {
                userId: user.id,
                ...billingInfo,
            },
            update: {
                ...billingInfo,
            },
        });

        return updateBillingInformation
    }

    async updateUserProfile(
        user: RequestUser,
        profile: Express.Multer.File,
        { username, email }: UpdateUserProfileDto,
    ) {
        let profileUrl = undefined;
        if (profile) {
            profileUrl = await this.fileUpload.upload(profile, {
                folder: 'profiles',
            });
        }

        const updatedUserProfile = await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                username,
                email,
                ...(profileUrl && { profile: profileUrl.secure_url }),
            },
        });

        return updatedUserProfile;
    }

    async getBillingInformation(user: RequestUser) {
        const billingInformation = await this.prisma.billingInformation.findFirst({
            where: {
                userId: user.id,
            },
        });

        if (!billingInformation) {
            throw new NotFoundException('Billing information not found');
        }

        return billingInformation;
    }
}

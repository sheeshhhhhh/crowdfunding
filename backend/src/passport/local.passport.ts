import { BadRequestException, GoneException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) { 
        super()
    }
    
    async validate(username: string, password: string) {
        const user = await this.authService.validateUser({ username, password })

        if(!user.user) {
            throw new BadRequestException({
                name: user.name,
                message: user.message
            })
        }

        return user.user
    }
}
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RefreshTokenDto, SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('signup')
    async singup(@Body() body: SignUpDto) {
        return this.authService.signup(body);
    }

    @Post('refreshToken')
    async refreshToken(@Body() body: RefreshTokenDto) {
        return this.authService.validateRefreshToken(body.refreshToken);
    }
}

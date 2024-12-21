import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { RefreshTokenDto, SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('facebook-login')
    @UseGuards(AuthGuard('facebook'))
    async facebookAuth(@Request() req: any) {}

    @Get('facebook-redirect')
    @UseGuards(AuthGuard('facebook'))
    async facebookAuthRedirect(@Request() req: any, @Response() res: any) {
        const tokens = await this.authService.validateFacebook(req.user);
        return res.redirect(`${process.env.CLIENT_BASE_URL}/redirecttoken?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`);
    }

    @Get('google-login')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Request() req: any) {}

    @Get('google-redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Request() req: any, @Response() res: any) {
        const tokens = await this.authService.validateGoogle(req.user);
        return res.redirect(`${process.env.CLIENT_BASE_URL}/redirecttoken?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`);
    }

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

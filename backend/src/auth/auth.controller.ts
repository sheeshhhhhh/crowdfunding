import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.authguard';
import { FacebookAuthGuard } from 'src/passport/facebook.passport';
import { GoogleAuthGuard } from 'src/passport/google.passport';
import { LocalAuthGuard } from 'src/passport/local.passport';
import { AuthService } from './auth.service';
import { RefreshTokenDto, SignUpDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('facebook-login')
    @UseGuards(FacebookAuthGuard)
    async facebookAuth(@Request() req: any) {}

    @Get('facebook-redirect')
    @UseGuards(FacebookAuthGuard)
    async facebookAuthRedirect(@Request() req: any, @Response() res: any) {
        const tokens = await this.authService.validateFacebook(req.user);
        return res.redirect(`${process.env.CLIENT_BASE_URL}/redirecttoken?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`);
    }

    @Get('google-login')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Request() req: any) {}

    @Get('google-redirect')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Request() req: any, @Response() res: any) {
        const tokens = await this.authService.validateGoogle(req.user);
        return res.redirect(`${process.env.CLIENT_BASE_URL}/redirecttoken?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`);
    }

    @UseGuards(LocalAuthGuard)
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

    @UseGuards(JwtAuthGuard)
    @Get('checkUser')
    async checkUser(@Request() req) {
        return this.authService.checkUser(req);
    }
}

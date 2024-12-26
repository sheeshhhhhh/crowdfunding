import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/passport/local.passport';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from 'src/passport/google.passport';
import { FacebookStrategy } from 'src/passport/facebook.passport';
import { JwtStrategy } from 'src/guards/jwt.authguard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    GoogleStrategy,
    FacebookStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}

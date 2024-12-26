import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
      callbackURL: process.env.APP_REDIRECT_URI,
      scope: ['email', 'public_profile'],
      profileFields: ['id', 'emails', 'name', 'photos'], // Explicitly request email and other fields
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any,
  ) {
    done(null, profile);
  }
}

export class FacebookAuthGuard extends AuthGuard('facebook') {}

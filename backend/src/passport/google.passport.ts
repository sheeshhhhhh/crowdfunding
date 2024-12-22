import { Inject, Injectable } from "@nestjs/common";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URI,
            scope: ['email', 'profile']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
        done(null, profile);
    }
}

export class GoogleAuthGuard extends AuthGuard('google') {}
import {
    Injectable,
} from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
  

const jwtSecret = process.env.JWT_SECRET!

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // set this to true if 
            secretOrKey: jwtSecret
        })
    }

    async validate(payload: any) {
        return payload;
    }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard(['jwt']) {}
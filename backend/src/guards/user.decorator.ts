import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserType } from '@prisma/client';
import { Request } from 'express';

// this is in auth service login this is the payload from jwt
type UserPayload = {
  id: UserType['id'];
  username: UserType['username'];
  email: UserType['email'];
  createdAt: UserType['createdAt'];
};

declare module 'express' {
  export interface Request {
    user: UserPayload;
  }
}

export type RequestUser = UserPayload;

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    return request.user;
  },
);

import { SetMetadata, createParamDecorator, ExecutionContext  } from '@nestjs/common';
import { userType } from '../enums';

export const TYPES_KEY = 'userTypes';
export const UserType = (...type: userType[]) => SetMetadata(TYPES_KEY, type);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);


export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.token;
  },
);
import { SetMetadata } from '@nestjs/common';
import { userType } from '../enums';

export const TYPES_KEY = 'userTypes';
export const UserType = (...type: userType[]) => SetMetadata(TYPES_KEY, type);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
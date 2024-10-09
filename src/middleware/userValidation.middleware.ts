import { createValidator } from 'express-joi-validation';
import {
  UserRegistrationSchema,
  UserLoginSchema,
  UserUpdateSchema,
} from '../schemas/user.requests.schemas';

const validator = createValidator();

export const validateUserRegistration = validator.body(UserRegistrationSchema);
export const validateUserLogin = validator.body(UserLoginSchema);
export const validateUserUpdate = validator.body(UserUpdateSchema);

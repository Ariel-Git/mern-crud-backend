import Joi from 'joi';

export const UserRegistrationSchema = Joi.object({
  firstname: Joi.string()
    .regex(/^[a-zA-Z]*$/)
    .min(2)
    .required()
    .label('First name')
    .messages({
      'string.min': 'First name must have at least 2 characters',
      'string.pattern.base': 'First name must contain letters only',
    }),
  lastname: Joi.string()
    .regex(/^[a-zA-Z]*$/)
    .min(2)
    .required()
    .label('Last name')
    .messages({
      'string.min': 'Last name must have at least 2 characters',
      'string.pattern.base': 'Last name must contain letters only',
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('Email'),
  password: Joi.string().min(6).required().label('Password'),
});

export const UserLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const UserUpdateSchema = Joi.object({
  firstname: Joi.string()
    .regex(/^[a-zA-Z]*$/)
    .min(2)
    .required()
    .label('First name')
    .messages({
      'string.min': 'First name must have at least 2 characters',
      'string.pattern.base': 'First name must contain letters only',
    }),
  lastname: Joi.string()
    .regex(/^[a-zA-Z]*$/)
    .min(2)
    .required()
    .label('Last name')
    .messages({
      'string.min': 'Last name must have at least 2 characters',
      'string.pattern.base': 'Last name must contain letters only',
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('Email'),
});

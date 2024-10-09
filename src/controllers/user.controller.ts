import { NextFunction, Request, Response } from 'express';
import { CustomError, InternalServerError } from '../utils/CustomError';
import {
  changePasswordHandler,
  deleteUserHandler,
  getAllUsersHandler,
  loginUserHandler,
  registerUserHandler,
  updateUserHandler,
} from '../services/user.service';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await registerUserHandler(req.body);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error instanceof CustomError) {
      return next(error);
    }
    next(
      new InternalServerError('Server error - failed to register user', error),
    );
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token, user } = await loginUserHandler(req.body);
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Logged in successfully', token, user });
  } catch (error) {
    if (error instanceof CustomError) {
      return next(error);
    }
    next(new InternalServerError('Server error - failed to login user', error));
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await getAllUsersHandler();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof CustomError) {
      return next(error);
    }
    next(new InternalServerError('Server error - failed to get users', error));
  }
};

export const updateUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;
  try {
    await updateUserHandler(id, req.body);
    res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {
    if (error instanceof CustomError) {
      return next(error);
    }
    next(
      new InternalServerError('Server error - failed to update user', error),
    );
  }
};
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;
  try {
    await deleteUserHandler(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    if (error instanceof CustomError) {
      return next(error);
    }
    next(
      new InternalServerError('Server error - failed to delete user', error),
    );
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;
  try {
    await changePasswordHandler(id, req.body);
    res.status(200).json({ message: 'User password changed successfully' });
  } catch (error) {
    if (error instanceof CustomError) {
      return next(error);
    }
    next(
      new InternalServerError(
        'Server error - failed to change password',
        error,
      ),
    );
  }
};

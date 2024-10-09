import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  createUser,
  deleteUserById,
  findUserByEmail,
  updateUserById,
  findAllUsers,
  User,
  findUserById,
  changePassword,
  findAllUsersByEmail,
} from '../models/user.model';
import {
  BadRequestError,
  NotAcceptable,
  UnauthorizedError,
} from '../utils/CustomError';
import { changePasswordBody } from '../types/requests/user.requests';

export const registerUserHandler = async (user: User) => {
  const { firstname, lastname, email, password } = user;
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new BadRequestError(
      'Email already in use',
      `Registration failed: email: ${email} is already in use`,
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser(firstname, lastname, email, hashedPassword);
  return true;
};

export const loginUserHandler = async (userCredentials: {
  email: string;
  password: string;
}) => {
  const { email, password } = userCredentials;
  const [row] = await findAllUsersByEmail(email);
  const user: User = row;
  if (!user) {
    throw new UnauthorizedError(
      'Invalid credentials',
      `Login failed, could't find email: %s ${email}`,
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedError(
      'Invalid credentials',
      `Login failed, incorrect password for email: %s ${email}`,
    );
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });
  const userResponse = { ...user, password: undefined };
  return { token, user: userResponse };
};

export const logoutUserHandler = (req: Request, res: Response) => {
  res.clearCookie('token');
  return true;
};
export const updateUserHandler = async (userId: string, user: User) => {
  const { firstname, lastname, email } = user;
  const usersByEmail = await findAllUsersByEmail(email);
  const existingUser = usersByEmail.find(
    (user) => user.id !== userId && user.email === email,
  );
  if (existingUser) {
    throw new NotAcceptable(
      'Email already in use',
      `Updating failed: email: ${email} is already in use`,
    );
  }
  await updateUserById(userId, firstname, lastname, email);
  return true;
};
export const deleteUserHandler = async (idToDelete: string) => {
  await deleteUserById(idToDelete);
  return true;
};
export const getAllUsersHandler = async () => {
  const users = await findAllUsers();
  return users.map((user) => ({
    ...user,
    password: undefined,
    id: user._id,
    _id: undefined,
  }));
};
export const changePasswordHandler = async (
  userId: string,
  password: changePasswordBody,
) => {
  const { oldPassword, newPassword } = password;
  const user: User | null = await findUserById(userId);
  const isTheSame = await bcrypt.compareSync(oldPassword, user!.password);
  if (!isTheSame) {
    throw new NotAcceptable('Old password is not correct');
  }
  const newHashedPassword = await bcrypt.hash(newPassword, 10);
  await changePassword(userId, newHashedPassword);
  return true;
};

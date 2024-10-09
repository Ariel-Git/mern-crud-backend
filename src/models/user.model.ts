import mongoose, { Schema, Document } from 'mongoose';

// Define the User schema
const userSchema = new Schema<User>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the User model
export interface User extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
const User = mongoose.model<User>('User', userSchema);

export const findAllUsers = async () => {
  await mongoose.connect(process.env.MONGODB_URI!);
  const users = await User.find({}, { __v: 0 }).lean();
  await mongoose.disconnect();
  return users;
};

export const findUserByEmail = async (email: string) => {
  await mongoose.connect(process.env.MONGODB_URI!);
  const user = await User.findOne({ email }, { __v: 0 }).lean();
  await mongoose.disconnect();
  return user;
};

export const findAllUsersByEmail = async (email: string) => {
  await mongoose.connect(process.env.MONGODB_URI!);
  const users = await User.find({ email }, { __v: 0 }).lean();
  await mongoose.disconnect();
  return users.map((user) => ({ ...user, id: user._id, _id: undefined }));
  return users;
};

export const findUserById = async (id: string) => {
  await mongoose.connect(process.env.MONGODB_URI!);
  const user = await User.findById(id, { __v: 0 }).lean();
  await mongoose.disconnect();
  return user;
};

export const createUser = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
) => {
  await mongoose.connect(process.env.MONGODB_URI!);
  const newUser = new User({ firstname, lastname, email, password });
  await newUser.save();
  await mongoose.disconnect();
  return true;
};

export const updateUserById = async (
  id: string,
  firstname: string,
  lastname: string,
  email: string,
) => {
  await mongoose.connect(process.env.MONGODB_URI!);
  await User.findByIdAndUpdate(id, { firstname, lastname, email });
  await mongoose.disconnect();
};

export const deleteUserById = async (id: string) => {
  await mongoose.connect(process.env.MONGODB_URI!);
  await User.findByIdAndDelete(id);
  await mongoose.disconnect();
};

export const deleteUserByEmail = async (email: string) => {
  await mongoose.connect(process.env.MONGODB_URI!);
  await User.deleteOne({ email });
  await mongoose.disconnect();
};

export const changePassword = async (id: string, password: string) => {
  await mongoose.connect(process.env.MONGODB_URI!);
  await User.findByIdAndUpdate(id, { password });
  await mongoose.disconnect();
};
/* import { RowDataPacket } from 'mysql2';
import pool from '../config/db.config';

export interface User extends RowDataPacket {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
export const findAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows as User[];
};
export const findUserByEmail = async (email: string) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [
    email,
  ]);
  return (rows as User[])[0];
};

export const findAllUsersByEmail = async (email: string) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [
    email,
  ]);
  return rows as User[];
};

export const findUserById = async (id: number) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return (rows as User[])[0];
};

export const createUser = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
) => {
  await pool.query(
    'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)',
    [firstname, lastname, email, password],
  );
  return true;
};

export const updateUserById = async (
  id: number,
  firstname: string,
  lastname: string,
  email: string,
) => {
  await pool.query(
    'UPDATE users SET firstname = ?, lastname = ?, email = ? WHERE id = ?',
    [firstname, lastname, email, id],
  );
};

export const deleteUserById = async (id: number) => {
  await pool.query('DELETE FROM users WHERE id = ?', [id]);
};

export const changePassword = async (id: number, password: string) => {
  await pool.query('UPDATE users SET password = ? WHERE id = ?', [
    password,
    id,
  ]);
};
 */

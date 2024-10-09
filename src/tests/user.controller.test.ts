import request from 'supertest';
import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserDetails,
  deleteUser,
  getAllUsers,
  changePassword,
} from '../controllers/user.controller';
import { afterAll, beforeAll, describe, it, expect } from '@jest/globals';
import { deleteUserByEmail, findUserById, User } from '../models/user.model'; // Assuming you have a User model
import { JWTPayload } from '../types/JwtPayload.type';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
app.post('/api/users/register', registerUser);
app.post('/api/users/login', loginUser);
app.post('/api/users/logout', logoutUser);
app.get('/api/users', getAllUsers);
app.put('/api/users/:id', updateUserDetails);
app.put('/api/users/change-password/:id', changePassword);
app.delete('/api/users/:id', deleteUser);

const testUser = {
  id: '', // This will be populated after user creation
  firstname: 'firstName',
  lastname: 'lastName',
  email: 'jesttest@jesttest.com',
  password: '3475980jhfwoie87534kjh',
  token: null,
};

describe('User Controller', () => {
  beforeAll(async () => {
    // Clear any existing test user before starting
    await deleteUserByEmail(testUser.email);
    await mongoose.connect(process.env.MONGODB_URI!);
  });

  afterAll(async () => {
    // Clear the test user after all tests are done
    await deleteUserByEmail(testUser.email);
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const res = await request(app).post('/api/users/register').send({
      firstname: testUser.firstname,
      lastname: testUser.lastname,
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.statusCode).toEqual(201);
  });

  it('should not login a user with wrong password', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: testUser.email,
        password: testUser.password + 'wrong_password',
      });

    expect(res.statusCode).toEqual(401);
  });

  it('should login a user', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    const user: User = res.body.user;
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('firstname', user.firstname);
    expect(user).toHaveProperty('lastname', user.lastname);
    expect(user).toHaveProperty('email', user.email);
    testUser.token = res.body.token;
    testUser.id = (jwt.decode(res.body.token) as JWTPayload).id;
  });

  it('should get all users', async () => {
    const res = await request(app)
      .get(`/api/users`)
      .set('Authorization', `${testUser.token}`)
      .expect(200);
    res.body.forEach((user: User) => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('firstname');
      expect(user).toHaveProperty('lastname');
      expect(user).toHaveProperty('email');
    });
  });

  it('should update a user', async () => {
    await request(app)
      .put(`/api/users/${testUser.id}`)
      .set('Authorization', `${testUser.token}`)
      .send({
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'newemail@example.com',
      })
      .expect(200);
  });

  it('should change user password', async () => {
    await request(app)
      .put(`/api/users/change-password/${testUser.id}`)
      .set('Authorization', `Bearer ${testUser.token}`)
      .send({
        oldPassword: testUser.password,
        newPassword: 'XXXXXXXXXXX',
      })
      .expect(200);

    // Update the testUser password for future tests
    testUser.password = 'XXXXXXXXXXX';
  });

  it('should delete a user', async () => {
    await request(app)
      .delete(`/api/users/${testUser.id}`)
      .set('Authorization', `Bearer ${testUser.token}`)
      .expect(200);

    // Check if the user was removed from the database
    const user = await findUserById(testUser.id);
    expect(user).toBeNull();
  });

  it('should logout a user', async () => {
    const res = await request(app).post('/api/users/logout');
    expect(res.statusCode).toEqual(200);
  });
});

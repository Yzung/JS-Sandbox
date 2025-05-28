import express from 'express';
import { handleGetAllUsers, handleCreateUser } from './user.controller.mjs';

const userRoutes = express.Router();

userRoutes.get('/', handleGetAllUsers);
userRoutes.post('/', handleCreateUser);

export default userRoutes

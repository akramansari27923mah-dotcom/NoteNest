import express from 'express';
import authController from '../controller/auth.controller.js';
import checkToken from '../middleware/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.get('/me', checkToken, authController.me)
authRouter.post('/logout', authController.logout)

export default authRouter
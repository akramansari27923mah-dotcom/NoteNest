import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import noteRouter from './routes/notes.route.js'
import authRouter from './routes/auth.route.js';
import ratelimiter from './middleware/ratelimit.middleware.js';


const app = express();

// MIDDLEWARE
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());
app.use(ratelimiter)
app.use(cookieParser())

// prefix
app.use('/api/notes', noteRouter)
app.use('/api/auth', authRouter)


export default app
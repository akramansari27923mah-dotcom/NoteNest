import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import 'dotenv/config'

import noteRouter from './routes/notes.route.js'
import authRouter from './routes/auth.route.js';
import ratelimiter from './middleware/ratelimit.middleware.js';


const app = express();
const __dirname = path.resolve();

// MIDDLEWARE
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }))
}

app.use(express.json());
app.use(ratelimiter)
app.use(cookieParser())

// prefix
app.use('/api/notes', noteRouter)
app.use('/api/auth', authRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
    })
}

export default app
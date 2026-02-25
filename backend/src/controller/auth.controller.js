import userModel from '../models/user.model.js'
import 'dotenv/config'
import hasePassword from '../lib/utils.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET
const EXPIRE_TOKEN = '24h'


const isProd = process.env.NODE_ENV === 'production';

const cookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000,
};


const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All feilds are required'
        })
    }

    const isEmailExist = await userModel.findOne({ email })

    if (isEmailExist) {
        return res.status(409).json({
            success: false,
            message: 'Email already exist'
        })
    }

    try {
        const hashedPassword = await hasePassword(password)

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({
            id: newUser._id,
            email: newUser.email,
            username: newUser.username
        }, JWT_SECRET, { expiresIn: EXPIRE_TOKEN })

        res.cookie('token', token, cookieOptions)

        res.status(200).json({
            success: true,
            message: 'User register successfully'
        })

    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Email already existe'
            })
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

const login = async (req, res) => {
    const { username, email, password } = req.body;

    if ((!username && !email) || !password) {
        return res.status(400).json({
            success: false,
            message: 'All feilds are required'
        })
    }

    try {

        const identifire = username?.trim() || email?.trim()
        const cleanPassword = password?.trim()

        const user = await userModel.findOne({
            $or: [
                { email: identifire },
                { username: identifire }
            ]
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentails'
            })
        }

        //COMPARE PASSWORD
        const isPassword = await bcrypt.compare(cleanPassword, user.password)

        if (!isPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentails'
            })
        }

        //GENERATE JWT TOKEN
        const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email
        }, JWT_SECRET, { expiresIn: EXPIRE_TOKEN })


        //SET TOKEN IN COOKIE
        res.cookie('token', token, cookieOptions)

        // SEND RESPONSE
        res.status(200).json({
            success: true,
            message: 'User loggedIn successfully',
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })

    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

const me = async (req, res) => {
    res.json({
        success: true,
        user: req.user
    })
}

const logout = async (req, res) => {
    res.clearCookie("token", cookieOptions);

    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
}

export default { register, login, me, logout }
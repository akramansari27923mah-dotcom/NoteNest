import jwt from 'jsonwebtoken';
import 'dotenv/config';

const checkToken = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(404).json({
            success: false,
            message: 'Unauthorized'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.id,
            email: decoded.email,
            username: decoded.username
        }

        next()
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: 'Unauthrozied : Invalid or expired token'
        })
    }
}

export default checkToken
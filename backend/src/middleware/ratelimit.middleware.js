import ratelimit from "../upstash/upstash.js";

const ratelimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit('my-rate-limiter');

        if (!success) {
            return res.status(429).json({
                success: false,
                message: 'To many requests, please try again later'
            })
        }

        next()
    }
    catch (err) {
        console.error('Rate limit error', err);
        next(err)
    }
}

export default ratelimiter
import mongoose from "mongoose";
import 'dotenv/config'
const mongoUri = process.env.MONGO_URI

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri)
            .then(() => {
                console.log('DB CONNECTED');
            })
    }
    catch (err) {
        console.log('database error', err);
        process.exit(1)
    }
}

export default connectDB
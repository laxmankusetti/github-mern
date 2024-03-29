import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MONGODB')
    } catch (error) {
        console.log(error.message)
    }
}
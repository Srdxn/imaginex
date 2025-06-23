import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('Database has been connected');
    })
    
    await mongoose.connect(`${process.env.MONGODB_URI}/imaginex`);
}

export default connectDB;
// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import mongoose from 'mongoose';
const connectDB = async () => {
    try {
            const conn = await mongoose.connect(process.env.MONGO_URI, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateInsed: true
            })
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`MongoDB Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB
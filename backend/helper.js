// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

// helpers to manage DB data (import and clear)
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

// imports data from files
const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;      // first user is the admin
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }      // all the products will be created by the admin user
        })

        await Product.insertMany(sampleProducts);
        console.log('Data imported.');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}

// clears everything
const clearData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Data cleared.');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    clearData();
} else {
    importData();
}
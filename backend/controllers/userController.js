// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// auth user and get token
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, token: generateToken(user._id) })
    } else { res.status(401); throw new Error("Email o password errata"); }
})

// user registration (public)
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("Utente già registrato");
    }
    const user = await User.create({ name, email, password });
    if (user) { res.status(201).json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, token: generateToken(user._id) })}
    else { 
        res.status(400);
        throw new Error("Utente non valido");
    }
})

// get user profile (private)
const getUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin })
    } else {
        res.status(404);
        throw new Error("Utente non trovato");
    }
})

// update user profile (private, PUT)
const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) user.password = req.body.password;
        const updatedUser = await user.save();
        res.json({ _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, isAdmin: updatedUser.isAdmin, token: generateToken(updatedUser._id) })
    } else {
        res.status(404);
        throw new Error("Utente non trovato");
    }
})

// get all users (admin)
const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find({});
    res.json(users);
})

// delete user (admin)
const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.remove();
        res.json({message: 'Utente eliminato'});
    } else {
        res.status(404);
        throw new Error('Utente non trovato');
    }
})

// get user by id (admin)
const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user){
        res.json(user);
    } else {
        res.status(404);
        throw new Error('Utente non trovato');
    }
})

// update any user profile (admin)
const updateAnyUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;
        const updatedUser = await user.save();
        res.json({ _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, isAdmin: updatedUser.isAdmin })
    } else {
        res.status(404);
        throw new Error("Utente non trovato");
    }
})

export { authUser, getUser, registerUser, updateUser, getAllUsers, deleteUser, getUserById, updateAnyUser }
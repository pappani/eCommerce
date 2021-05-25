// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import asyncHandler from 'express-async-handler';   // to manage errors inside server.js
import Product from '../models/productModel.js';

// fetch all products
const getProducts = asyncHandler(async(req, res) => {
    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' }} : {};
    const products1 = await Product.find({ ...keyword });
    const products2 = await Product.find({ category: req.query.keyword });
    const products = products1.concat(products2);
    res.json(products);
})

// fetch a single product
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Prodotto non trovato');
    }
})

// delete a product (admin)
const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: 'Prodotto eliminato' });
    } else {
        res.status(404);
        throw new Error('Prodotto non trovato');
    }
})

// create a product (admin)
const createProduct = asyncHandler(async(req, res) => {
    const product = new Product({ name: 'Nome', price: 0, user: req.user._id, image: '/images/sample.jpg', 
        brand: 'Marca', category: 'Categoria', countInStock: 0, numReviews: 0, description: 'Descrizione'});
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
})

// update a product (admin)
const updateProduct = asyncHandler(async(req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Prodotto non trovato');
    }
})

// create review (private)
const createReview = asyncHandler(async(req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        const userHasAlreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
        if (userHasAlreadyReviewed) { res.status(400); throw new Error('Hai già recensito questo prodotto'); };
        const review = { name: req.user.name, rating: Number(rating), comment, user: req.user._id };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.avgRating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;  // update product avg rating
        await product.save();
        res.status(201).json({ message: 'Recensione aggiunta' });
    } else {
        res.status(404);
        throw new Error('Prodotto non trovato');
    }
})

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createReview }
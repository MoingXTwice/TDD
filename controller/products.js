const Product = require('../models/Product');

exports.createProduct = (req, res, next) => {
    const createdProduct = Product.create(req.body);
    res.status(201).json(createdProduct);
}
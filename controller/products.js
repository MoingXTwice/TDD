const Product = require('../models/Product');

exports.createProduct = async (req, res, next) => {
    try {
        const createdProduct = await Product.create(req.body);
        res.status(201).json(createdProduct);
    } catch (e) {
        next(e);
    }
}
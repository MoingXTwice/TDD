const Product = require('../models/Product');

exports.createProduct = async (req, res, next) => {
    try {
        const createdProduct = await Product.create(req.body);
        res.status(201).json(createdProduct);
    } catch (e) {
        res.status(500).json({ message: '생성 실패' });
        // next(e); // 해당 에러처리를 쓰게 되면 server.js 의 에러처리 미들웨어로 넘어가게 된다.
    }
};

exports.getProducts = async (req, res, next) => {
    try {
        const allProducts = await Product.find({});
        res.status(200).json(allProducts);
    } catch (e) {
        res.status(500).json({ message: '조회 실패' });
        // next(e); // 해당 에러처리를 쓰게 되면 server.js 의 에러처리 미들웨어로 넘어가게 된다.
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).send();
        }
    } catch (e) {
        res.status(500).json({ message: '조회 실패' });
    }
};
const Product = require('../models/Product');

exports.createProduct = async (req, res, next) => {
    try {
        const createdProduct = await Product.create(req.body);
        res.status(201).json(createdProduct);
    } catch (e) {
        res.status(400).json({ message: '생성 실패' });
        // next(e); // 해당 에러처리를 쓰게 되면 server.js 의 에러처리 미들웨어로 넘어가게 된다.
    }
}
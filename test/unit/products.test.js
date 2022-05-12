const productController = require('../../controller/products');
const Product = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');

Product.create = jest.fn();

let req;
let res;
let next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
})

describe('Product Controller Create', () => {
    beforeEach(() => {
        req.body = newProduct;
    })
    it('should have a createProduct function', () => {
        expect(typeof productController.createProduct).toBe('function');
    });
    it('should call Product.create', () => {
        productController.createProduct(req, res, next);
        expect(Product.create).toBeCalledWith(newProduct);
    });
    it('should return 201 response code', () => {
        productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled).toBeTruthy();
    });
    it('should return json body in response', () => {
        Product.create.mockReturnValue(newProduct);
        productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    });
});
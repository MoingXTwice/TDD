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
    next = jest.fn();
});

describe('Product Controller Create', () => {
    beforeEach(() => {
        req.body = newProduct;
    })
    it('should have a createProduct function', () => {
        expect(typeof productController.createProduct).toBe('function');
    });
    it('should call Product.create', async () => {
        await productController.createProduct(req, res, next);
        expect(Product.create).toBeCalledWith(newProduct);
    });
    it('should return 201 response code', async () => {
        await productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled).toBeTruthy();
    });
    it('should return json body in response', async () => {
        Product.create.mockReturnValue(newProduct);
        await productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    });
    it('should handle errors', async () => {
        const errorMessage = { message: 'description property missing' };
        const rejectedPromise = Promise.reject(errorMessage);
        Product.create.mockReturnValue(rejectedPromise);
        await productController.createProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});
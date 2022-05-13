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
        const errorMessage = { message: '생성 실패' }; // 에러메세지를 선언해준다.
        const rejectedPromise = Promise.reject(errorMessage); // 에러가 나는 상황을 가정하여 선언한다. 에러가 나면 errorMessage를 반환한다.
        Product.create.mockReturnValue(rejectedPromise); // Product.create 할 때 rejectedPromise 에러가 발생한다.
        await productController.createProduct(req, res, next); // createProduct 실행
        expect(res._getJSONData()).toStrictEqual(errorMessage); // controller 에서 반환된 json과 선언한 에러메세지가 같은지 비교한다.
        expect(res.statusCode).toEqual(400); // controller 에서 반환된 statusCode가 controller에서 선언한 statusCode와 같은지 비교한다.
    });
});
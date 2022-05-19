const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product.json');

let firstProduct;

it('POST /api/products', async () => {
    const response = await request(app)
        .post('/api/products')
        .send(newProduct);
    expect(response.statusCode).toEqual(201);
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.description).toBe(newProduct.description);
    expect(response.body.price).toBe(newProduct.price);
});

it('should return 500 on POST /api/products', async () => {
    const response = await request(app)
        .post('/api/products')
        .send({ name: 'phone' });
    expect(response.statusCode).toEqual(500);
    expect(response.body).toStrictEqual({ message: '생성 실패' });
});

it('GET /api/products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();
    expect(response.body[0].description).toBeDefined();
    expect(response.body[0].price).toBeDefined();
    firstProduct = response.body[0];
});

it('GET /api/products/:productId', async () => {
    const response = await request(app).get('/api/products/' + firstProduct._id);
    expect(response.statusCode).toEqual(200);
    expect(response.body.name).toBe(firstProduct.name);
    expect(response.body.description).toBe(firstProduct.description);
    expect(response.body.price).toBe(firstProduct.price);
});

it('GET id doesnt exist /api/products/:productId', async () => {
    const response = await request(app).get('/api/products/627e26007c0297df0fb6c3d1');
    expect(response.statusCode).toEqual(404);
});

it('PUT /api/products', async () => {
    const response = await request(app)
        .put('/api/products/' + firstProduct._id)
        .send({ name: 'updated name', description: 'updated description' });
    expect(response.statusCode).toEqual(201);
    expect(response.body.name).toEqual('updated name');
    expect(response.body.description).toEqual('updated description');
});

it('PUT id doesnt exist /api/products/:productId', async () => {
    const response = await request(app)
        .put('/api/products/627e26007c0297df0fb6c3d1')
        .send({ name: 'updated name', description: 'updated description' });
    expect(response.statusCode).toEqual(404);
});

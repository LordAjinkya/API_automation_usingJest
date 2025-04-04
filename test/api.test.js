require('dotenv').config();
const request = require('supertest');

const API_BASE_URL = process.env.API_BASE_URL;
const TOKEN = process.env.TOKEN;
const api = request(API_BASE_URL);

describe('Product Inventory API Tests', () => {
  
  it('should fetch all products', async () => {
    const response = await api.get('/api/products')
      .set('Authorization', `Bearer ${TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should fetch product details by ID', async () => {
    const productId = '3'; 
    const response = await api.get(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('product');
    expect(response.body.product).toHaveProperty('name');
  });

  it('should create a new product', async () => {
    const newProduct = {
      name: "Test Product",
      price: 100,
      stock: 10
    };

    const response = await api.post('/api/products')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(newProduct);

      expect([200, 201]).toContain(response.status);
      expect(response.body).toHaveProperty('product.id');
  });


it('should update an existing product', async () => {
  const productId = 1; 

  const response = await request(API_BASE_URL)
    .put(`/api/products/${productId}`)
    .set('Authorization', `Bearer ${TOKEN}`) 

  console.log(response.status, response.body); 

  expect(response.status).toBe(200); 

  if (response.body.product) {
    expect(response.body.product).toHaveProperty('price', 120);
  } else {
    expect(response.body).toHaveProperty('price', 120);
  }
});

  

  it('should delete a product', async () => {
    const productId = 'valid_product_id';

    const response = await api.delete(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${TOKEN}`);

      expect([204, 400]).toContain(response.status);
  });

  it('should return an error for unauthorized access', async () => {
    const response = await api.get('/api/products')
      .set('Authorization', 'Bearer INVALID_TOKEN');

      expect([401, 403]).toContain(response.status);
  });

  it('should return error for an invalid product ID', async () => {
    const invalidProductId = 9999; 

    const response = await request(API_BASE_URL)
      .put(`/api/products/${invalidProductId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .set('Content-Type', 'application/json')
      .send({ price: 100 });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Product not found');      
  });

  it('should handle malformed input', async () => {
    const productId = 1;
  
    const response = await request(API_BASE_URL)
      .put(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${TOKEN}`) 
      .send({ price: "one hundred" });
  
    console.log(response.status, response.body); 
  
    expect(response.status).toBe(400); 
    expect(response.body).toHaveProperty('error', 'Invalid input format');
  });
    

  it('should reject updating price to zero', async () => {
    const response = await request(API_BASE_URL)
      .put(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${AUTH_TOKEN}`)
      .set('Content-Type', 'application/json')
      .send({ price: 0 });

    console.log('Response:', response.status, response.body);

    expect(response.status).toBe(400);  
    expect(response.body).toHaveProperty('error');  
  });
    it('should reject negative stock values', async () => {
        const response = await request(API_BASE_URL)
          .put(`/api/products/${productId}`)
          .set('Authorization', `Bearer ${AUTH_TOKEN}`)
          .set('Content-Type', 'application/json')
          .send({ stock: -10 });
    
        console.log('Response:', response.status, response.body); // Debugging
    
        // Expect API to reject the request
        expect(response.status).toBe(400);  // Ensure proper error response
        expect(response.body).toHaveProperty('error');  // Ensure error message exists
    });
    
  
  
});

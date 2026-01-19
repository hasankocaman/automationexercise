/**
 * API Specification for Swagger Documentation
 * 
 * Defines the structure, parameters, and examples for the mock endpoints.
 */
export const API_SPEC = [
    {
        id: 'login',
        path: '/login',
        method: 'POST',
        summary: 'User Login',
        description: 'Authenticates a user and returns a token.',
        tags: ['Auth'],
        parameters: [],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            email: { type: 'string', example: 'test@example.com' },
                            password: { type: 'string', example: 'password123' }
                        },
                        required: ['email', 'password']
                    },
                    example: {
                        email: 'test@example.com',
                        password: 'password123'
                    }
                }
            }
        },
        responses: {
            200: { description: 'Login successful, returns user data.' },
            400: { description: 'Missing credentials.' },
            404: { description: 'User not found.' }
        }
    },
    {
        id: 'products',
        path: '/productsList',
        method: 'GET',
        summary: 'Get All Products',
        description: 'Retrieves a list of all available products.',
        tags: ['Products'],
        parameters: [],
        requestBody: null,
        responses: {
            200: { description: 'Returns a list of products.' }
        }
    },
    {
        id: 'createOrder',
        path: '/createOrder',
        method: 'POST',
        summary: 'Create Order',
        description: 'Places a new order for a specific product.',
        tags: ['Order'],
        parameters: [],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            productId: { type: 'integer', example: 1 },
                            quantity: { type: 'integer', example: 2 }
                        },
                        required: ['productId', 'quantity']
                    },
                    example: {
                        productId: 1,
                        quantity: 2
                    }
                }
            }
        },
        responses: {
            201: { description: 'Order created successfully.' },
            400: { description: 'Invalid input.' },
            404: { description: 'Product not found.' }
        }
    }
];

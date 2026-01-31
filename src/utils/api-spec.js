/**
 * API Specification for Swagger Documentation
 * 
 * Defines the structure, parameters, and examples for the mock endpoints.
 */
export const API_SPEC = [
    // --- Auth ---
    {
        id: 'login',
        path: '/login',
        method: 'POST',
        summary: 'User Login',
        description: 'Authenticates a user and returns a token.',
        tags: ['Auth'],
        parameters: [],
        translationKey: 'login', // Future compatibility if we want specific keys
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

    // --- Products ---
    {
        id: 'products',
        path: '/productsList',
        method: 'GET',
        summary: 'Get All Products',
        description: 'Retrieves a list of all available products.',
        tags: ['Products'],
        parameters: [],
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
    },

    // --- Books (New CRUD) ---
    {
        id: 'getBooks',
        path: '/books',
        method: 'GET',
        summary: 'Get All Books',
        description: 'Retrieves a list of all available books in the library.',
        translationKey: 'getBooks',
        tags: ['Books'],
        parameters: [],
        responses: {
            200: {
                description: 'List of books',
                example: [
                    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
                    { id: 2, title: '1984', author: 'George Orwell' }
                ]
            }
        }
    },
    {
        id: 'getBookById',
        path: '/books/:id',
        method: 'GET',
        summary: 'Get Book by ID',
        description: 'Retrieves a specific book using its unique ID.',
        translationKey: 'getBookById',
        tags: ['Books'],
        parameters: [
            { name: 'id', in: 'path', required: true, description: 'ID of the book to retrieve' }
        ],
        responses: {
            200: { description: 'Book details' },
            404: { description: 'Book not found' }
        }
    },
    {
        id: 'createBook',
        path: '/books',
        method: 'POST',
        summary: 'Create New Book',
        description: 'Adds a new book to the library.',
        translationKey: 'createBook',
        tags: ['Books'],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    example: {
                        title: 'New Book Title',
                        author: 'Author Name'
                    }
                }
            }
        },
        responses: {
            201: { description: 'Book created' },
            400: { description: 'Invalid input' }
        }
    },
    {
        id: 'updateBook',
        path: '/books/:id',
        method: 'PUT',
        summary: 'Update Book',
        description: 'Updates an existing book\'s information by ID.',
        translationKey: 'updateBook',
        tags: ['Books'],
        parameters: [
            { name: 'id', in: 'path', required: true, description: 'ID of the book to update' }
        ],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    example: {
                        title: 'Updated Title',
                        author: 'Updated Author'
                    }
                }
            }
        },
        responses: {
            200: { description: 'Book updated' },
            404: { description: 'Book not found' }
        }
    },
    {
        id: 'deleteBook',
        path: '/books/:id',
        method: 'DELETE',
        summary: 'Delete Book',
        description: 'Removes a book from the library permanently.',
        translationKey: 'deleteBook',
        tags: ['Books'],
        parameters: [
            { name: 'id', in: 'path', required: true, description: 'ID of the book to delete' }
        ],
        responses: {
            200: { description: 'Book deleted' },
            404: { description: 'Book not found' }
        }
    }
];

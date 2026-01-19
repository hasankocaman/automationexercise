import { http, HttpResponse, delay } from 'msw'

// Mock Database
const db = {
    products: [
        { id: 1, name: 'Blue Top', price: 500, category: 'Tops', brand: 'Polo' },
        { id: 2, name: 'Men Tshirt', price: 400, category: 'Tshirts', brand: 'H&M' },
        { id: 3, name: 'Sleeveless Dress', price: 1000, category: 'Dress', brand: 'Madame' },
        { id: 4, name: 'Stylish Dress', price: 1500, category: 'Dress', brand: 'Madame' },
        { id: 5, name: 'Winter Coat', price: 3000, category: 'Coat', brand: 'Zara' },
        { id: 6, name: 'Jeans', price: 1200, category: 'Jeans', brand: 'Levis' },
        { id: 7, name: 'Running Shoes', price: 2500, category: 'Shoes', brand: 'Nike' },
    ],
    users: [
        { email: 'test@example.com', password: 'password123', name: 'Test User' }
    ]
}

export const handlers = [
    // GET /productsList
    http.get('/productsList', async () => {
        // Random latency between 500ms and 1500ms
        await delay(Math.floor(Math.random() * 1000) + 500)

        return HttpResponse.json({
            responseCode: 200,
            products: db.products
        })
    }),

    // POST /login
    http.post('/login', async ({ request }) => {
        await delay(Math.floor(Math.random() * 1000) + 500)

        const credentials = await request.json()

        if (!credentials || !credentials.email || !credentials.password) {
            return HttpResponse.json({
                responseCode: 400,
                message: 'Bad Request: Missing email or password'
            }, { status: 400 })
        }

        const user = db.users.find(u => u.email === credentials.email && u.password === credentials.password)

        if (user) {
            return HttpResponse.json({
                responseCode: 200,
                message: 'User exists!',
                user: { name: user.name, email: user.email }
            })
        } else {
            return HttpResponse.json({
                responseCode: 404,
                message: 'User not found!'
            }, { status: 404 })
        }
    }),

    // POST /createOrder
    http.post('/createOrder', async ({ request }) => {
        await delay(Math.floor(Math.random() * 1000) + 500)

        const orderData = await request.json()

        if (!orderData || !orderData.productId || !orderData.quantity) {
            return HttpResponse.json({
                responseCode: 400,
                message: 'Bad Request: Missing productId or quantity'
            }, { status: 400 })
        }

        const product = db.products.find(p => p.id === orderData.productId)
        if (!product) {
            return HttpResponse.json({
                responseCode: 404,
                message: 'Product not found'
            }, { status: 404 })
        }

        return HttpResponse.json({
            responseCode: 201,
            message: 'Order created successfully!',
            order: {
                id: Math.floor(Math.random() * 100000),
                product: product.name,
                quantity: orderData.quantity,
                totalPrice: product.price * orderData.quantity,
                createdAt: new Date().toISOString()
            }
        }, { status: 201 })
    })
]

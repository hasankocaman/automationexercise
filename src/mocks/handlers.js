import { http, HttpResponse, delay } from 'msw'

// Helper to handle base URL (e.g., /automationexercise/)
const getPath = (path) => {
    const baseUrl = import.meta.env.BASE_URL
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
    // remove leading slash from path if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${cleanBase}${cleanPath}`
}

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
    ],
    // Initial Books Data
    books: [
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565' },
        { id: 2, title: '1984', author: 'George Orwell', isbn: '9780451524935' },
        { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084' },
        { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '9781503290563' }
    ]
}

export const handlers = [
    // --- Products & Orders ---

    // GET /productsList
    http.get(getPath('/productsList'), async () => {
        await delay(Math.floor(Math.random() * 1000) + 500)
        return HttpResponse.json({
            responseCode: 200,
            products: db.products
        })
    }),

    // POST /login
    http.post(getPath('/login'), async ({ request }) => {
        await delay(Math.floor(Math.random() * 1000) + 500)
        const credentials = await request.json()
        if (!credentials || !credentials.email || !credentials.password) {
            return HttpResponse.json({ responseCode: 400, message: 'Bad Request: Missing email or password' }, { status: 400 })
        }
        const user = db.users.find(u => u.email === credentials.email && u.password === credentials.password)
        if (user) {
            return HttpResponse.json({ responseCode: 200, message: 'User exists!', user: { name: user.name, email: user.email } })
        } else {
            return HttpResponse.json({ responseCode: 404, message: 'User not found!' }, { status: 404 })
        }
    }),

    // POST /createOrder
    http.post(getPath('/createOrder'), async ({ request }) => {
        await delay(Math.floor(Math.random() * 1000) + 500)
        const orderData = await request.json()
        if (!orderData || !orderData.productId || !orderData.quantity) {
            return HttpResponse.json({ responseCode: 400, message: 'Bad Request: Missing productId or quantity' }, { status: 400 })
        }
        const product = db.products.find(p => p.id === orderData.productId)
        if (!product) {
            return HttpResponse.json({ responseCode: 404, message: 'Product not found' }, { status: 404 })
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
    }),

    // --- Books CRUD ---

    // GET /books
    http.get(getPath('/books'), async () => {
        await delay(500)
        return HttpResponse.json(db.books)
    }),

    // GET /books/:id
    http.get(getPath('/books/:id'), async ({ params }) => {
        await delay(500)
        const { id } = params
        const book = db.books.find(b => b.id === Number(id))

        if (book) {
            return HttpResponse.json(book)
        }
        return HttpResponse.json({ message: 'Book not found' }, { status: 404 })
    }),

    // POST /books
    http.post(getPath('/books'), async ({ request }) => {
        await delay(500)
        const bookData = await request.json()

        if (!bookData.title || !bookData.author) {
            return HttpResponse.json({ message: 'Title and Author are required' }, { status: 400 })
        }

        const newBook = {
            id: db.books.length > 0 ? Math.max(...db.books.map(b => b.id)) + 1 : 1,
            ...bookData
        }

        db.books.push(newBook)

        return HttpResponse.json(newBook, { status: 201 })
    }),

    // PUT /books/:id
    http.put(getPath('/books/:id'), async ({ params, request }) => {
        await delay(500)
        const { id } = params
        const updateData = await request.json()

        const bookIndex = db.books.findIndex(b => b.id === Number(id))

        if (bookIndex !== -1) {
            db.books[bookIndex] = { ...db.books[bookIndex], ...updateData }
            return HttpResponse.json(db.books[bookIndex])
        }

        return HttpResponse.json({ message: 'Book not found' }, { status: 404 })
    }),

    // DELETE /books/:id
    http.delete(getPath('/books/:id'), async ({ params }) => {
        await delay(500)
        const { id } = params
        const bookIndex = db.books.findIndex(b => b.id === Number(id))

        if (bookIndex !== -1) {
            const deleted = db.books.splice(bookIndex, 1)
            return HttpResponse.json({ message: 'Book deleted successfully', book: deleted[0] })
        }

        return HttpResponse.json({ message: 'Book not found' }, { status: 404 })
    })
]

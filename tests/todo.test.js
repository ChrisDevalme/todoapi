// router.get('/', todoCtrl.index) // Index
// router.post('/', todoCtrl.create) // Create
// router.put('/:id', todoCtrl.update) // Update
// router.delete('/:id', todoCtrl.destroy) // Delete
// router.get('/:id', todoCtrl.show) // Show

const mongoose = require('mongoose')
const app = require('../app')
const { MongoMemoryServer } = require('mongodb-memory-server')
const request = require('supertest')
const server = app.listen('8080', () => console.log('Lets Test'))
const Todo = require('../models/todo')
let mongoServer 

beforeAll(async() => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async() => {
    await mongoose.connection.close()
    mongoServer.stop() 
    server.close()
})

describe('Testing todo Endpoints Foe a RESTFUL JSON API', () => {
    test('It Should display a lsit of Todos', async () => {
        const todo = new Todo({ title: 'test todo', description: 'test description', completed: false }) 
        await todo.save()
        
        const response = await request(app).get('/todos')

        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBeTruthy()

        for(let i = 0; i < response.body.length; i++){
            expect(response.body[i]).toHaveProperty('title')
            expect(response.body[i]).toHaveProperty('description')
            expect(response.body[i]).toHaveProperty('completed')
            expect(response.body[i]).toHaveProperty('createdAt')
        }
    }) 
})
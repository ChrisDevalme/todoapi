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
    test('It Should display a list of Todos', async () => {
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

    test('It Should Create a New Todo', async () => {
        const response = await request(app).post('/todos').send({
            title: "test todo 1",
            description: "What i got to do",
            completed: false
        })

        expect(response.body.title).toEqual('test todo 1')
        expect(response.body.description).toEqual('What i got to do')
        expect(response.body.completed).toBeFalsy()
    })

    test('Given a valid body it should update an existing todo and return it', async () => {
        const todo = new Todo({ title: 'test todo', description: 'test description', completed: false }) 
        await todo.save()
        
        const response = await request(app).put(`/todos/${todo._id}`).send({
            description: 'This is how we do it'
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.description).toEqual('This is how we do it')
            
    }) 

    test('It should delete an pre-existing todo given a valid todo id', async () => {
        const todo = new Todo({ title: 'test todo', description: 'test description', completed: false }) 
        await todo.save()
        
        const response = await request(app).delete(`/todos/${todo._id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toEqual(`The todo with the Id of ${todo._id} was deleted from the MonogoDb database, no further action necessary.`)
    }) 

    test('It should show a pre-existing todo given a valid todo id', async () => {
        const todo = new Todo({ title: 'test todo', description: 'test', completed: true })
        await todo.save()

        const response = await request(app).get(`/todos/${todo._id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('test todo')
        expect(response.body.description).toEqual('test')
        expect(response.body.completed).toBeTruthy()

    })

    
})
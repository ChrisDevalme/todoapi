// Create the express app object and add my middleware

const express = require('express')
const app = express()
const todoRouter = require('./routes/todoRouter')

// Middleware 
app.use(express.json()) // BodyParser middleware for json API's (parses 'req.body', "req.body will not work unless you call this")
app.use(express.urlencoded({ extended: true })) // BodyParser middleware for Server Side Rendered Apps
app.use('/todos', todoRouter)

module.exports = app
const Todo = require("../models/todo")


exports.index = async function index(req,res) {
    // Grab all todos from database
    try {
        const allTodos = await Todo.find({})
        res.status(200).json(allTodos)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
exports.create = async function create(req,res) {
    // Make a new todo in database
    try {
        const newTodo = await Todo.create(req.body)
        res.status(200).json(newTodo)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.update = async function update(req,res) {
    // Update exsiting todo in database
    try {
        
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.destroy = async function destroy(req,res) {
    // Delete an exsisting todo in database
    try {
        
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.show = async function show(req,res) {
    // Show 1 individual todo
    try {
        
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


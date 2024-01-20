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
        const updatedTodo = await Todo.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true }) 
        // ({what were updating}, what we want to update it to, {makes it return the new todo rather than the old one})
        res.status(200).json(updatedTodo)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.destroy = async function destroy(req,res) {
    // Delete an exsisting todo in database
    try {
        const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id })
        res.status(200).json({ msg: `The todo with the Id of ${deletedTodo._id} was deleted from the MonogoDb database, no further action necessary.` })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.show = async function show(req,res) {
    // Show 1 individual todo
    try {
        const foundTodo = await Todo.findById({ _id: req.params.id})
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    completed: { type: Boolean, require: true }
}, {
    timestamps: true
})

const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo
const todoCtrl = require('../controllers/todoController')
const express = require('express')
const router = express.Router()


router.get('/', todoCtrl.index) // Index
router.post('/', todoCtrl.create) // Create
router.put('/:id', todoCtrl.update) // Update
router.delete('/:id', todoCtrl.destroy) // Delete
router.get('/:id', todoCtrl.show) // Show

module.exports = router
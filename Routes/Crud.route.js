const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/User.Controller')

router.get('/users', UserController.find);

router.get('/users/:id', UserController.findById);

router.put('/users/:id', UserController.findOneAndUpdate);

router.delete('/users/:id', UserController.findByIdAndRemove);

router.delete('/users/', UserController.removeAll);

module.exports = router
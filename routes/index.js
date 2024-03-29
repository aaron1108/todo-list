const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
const auth = require('./modules/auth')

router.use('/todos', authenticator, todos)
router.use('/auth', auth)
router.use('/user', users)
router.use('/', authenticator, home)

module.exports = router
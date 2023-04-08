const express = require('express')
const { rawListeners } = require('../../models/todo')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router
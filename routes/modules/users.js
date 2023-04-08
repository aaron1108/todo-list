const express = require('express')
const router = express.Router()

const User = require('../../models/user')
const user = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  User.findOne({ email }).then(user => {
    if (user) {
      console.log('this email is already in use')
      res.render('register', { name, email, password, confirmPassword })
    }
    else {
      User.create({ name, email, password, confirmPassword })
        .then(res.redirect('/'))
        .catch(error => console.log(error))
    }
  })
})

module.exports = router
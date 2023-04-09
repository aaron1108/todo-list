const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/user/login', failureFlash: true }))

router.get('/register', (req, res) => res.render('register'))

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) errors.push({ 'message': '所有欄位皆為必填!' })

  if (password !== confirmPassword) errors.push({ 'message': '密碼與確認密碼不一致!' })

  if (errors.length) return res.render('register', { errors, name, email, password, confirmPassword })

  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ 'message': '此 Email 已經被註冊過了!' })
      return res.render('register', { errors, name, email, password, confirmPassword })
    }
    User.create({ name, email, password, confirmPassword })
      .then(res.redirect('/'))
      .catch(error => console.log(error))

  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已成功登出!')
  res.redirect('/user/login')
})

module.exports = router
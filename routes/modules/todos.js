const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name
  const userId = req.user._id
  return Todo.create({ name, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Todo.findOne({ _id, userId })
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Todo.findOne({ _id, userId })
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  //新方法
  const _id = req.params.id
  Todo.findByIdAndUpdate(_id, { name: req.body.name, isDone: req.body.isDone === "on" })


    //舊方法 save()已經移除
    // const { name, isDone } = req.body
    // return Todo.findById(req.params.id)
    //   .then(todo => {
    //     todo.name = name
    //     todo.isDone = isDone === "on"
    //     return todo.save()
    //   })
    .then(() => res.redirect('/todos/' + _id))
    .catch(error => console.error(error))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Todo.findOne({ _id, userId })
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/new', (req, res) => {
  let number = Todo.count()
  console.log(number)
  return res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name

  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  console.log(req.params.id)
  //新方法
  Todo.findByIdAndUpdate(req.params.id, { name: req.body.name, isDone: req.body.isDone === "on" })


    //舊方法 save()已經移除
    // const { name, isDone } = req.body
    // return Todo.findById(req.params.id)
    //   .then(todo => {
    //     todo.name = name
    //     todo.isDone = isDone === "on"
    //     return todo.save()
    //   })
    .then(() => res.redirect('/todos/' + req.params.id + '/edit'))
    .catch(error => console.error(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
const express = require('express')
const mongoose = require('mongoose') //載入mongoose

const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')

const Todo = require('./models/todo.js')

const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

app.get('/todo/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name


  //方法1
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))

  //方法2
  /*const todo = new Todo({ name })
  
  return todo.save()
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))*/
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
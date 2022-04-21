const express = require('express')
const app = express()
const morgan = require('morgan')
const createError = require('http-errors')

// enable env variable
require('dotenv').config()

// cors
const cors = require('cors');
app.use(cors());

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// db connection
require('./helpers/init_mongodb').sync;

// route
const AuthRoute = require('./Routes/Auth.route')
const CrudRoute = require('./Routes/Crud.route')
app.use('/api', AuthRoute)
app.use('/api', CrudRoute)

app.use(async (req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

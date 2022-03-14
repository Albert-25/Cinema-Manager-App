const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { routes } = require('./routes/index.js')
const app = express()

app.use(express.json()) // Acept format JSON in requests
app.use(morgan('dev')) // Log info 
app.use(cors()) // Allow everyone to share resources
app.use(routes) // Routes

module.exports = { app }
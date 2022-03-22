const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 1234
const DATABASE_URI = process.env.DATABASE_URI
const AXIOS = {}
const PRIVATEKEY = process.env.PRIVATEKEY

module.exports = { PORT, DATABASE_URI, AXIOS, PRIVATEKEY }
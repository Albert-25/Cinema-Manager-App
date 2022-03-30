const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 1234
const DATABASE_URI_LOCAL = process.env.DATABASE_URI_LOCAL
const DATABASE_URI_REMOTO = process.env.DATABASE_URI_REMOTO
const PRIVATEKEY = process.env.PRIVATEKEY
const ENV = process.env.ENV
const DATABASE = {
  uri: ENV === 'local' ? DATABASE_URI_LOCAL : DATABASE_URI_REMOTO,
  opt: ENV === 'local' ? null : { ssl: { require: true, rejectUnauthorized: false } }
}

module.exports = { PORT, DATABASE, ENV, PRIVATEKEY }
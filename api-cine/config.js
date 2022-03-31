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

const GOOGLE_APPLICATION_PROJECT_ID = process.env.GOOGLE_APPLICATION_PROJECT_ID

const GOOGLE_APPLICATION_TYPE = process.env.GOOGLE_APPLICATION_TYPE
const GOOGLE_APPLICATION_PRIVATE_KEY_ID = process.env.GOOGLE_APPLICATION_PRIVATE_KEY_ID
const GOOGLE_APPLICATION_PRIVATE_KEY = process.env.GOOGLE_APPLICATION_PRIVATE_KEY
const GOOGLE_APPLICATION_CLIENT_EMAIL = process.env.GOOGLE_APPLICATION_CLIENT_EMAIL
const GOOGLE_APPLICATION_CLIENT_ID = process.env.GOOGLE_APPLICATION_CLIENT_ID
const GOOGLE_APPLICATION_AUTH_URI = process.env.GOOGLE_APPLICATION_AUTH_URI
const GOOGLE_APPLICATION_TOKEN_URI = process.env.GOOGLE_APPLICATION_TOKEN_URI
const GOOGLE_APPLICATION_AUTH_PROVIDER_X509_CERT_URL = process.env.GOOGLE_APPLICATION_AUTH_PROVIDER_X509_CERT_URL
const GOOGLE_APPLICATION_CLIENT_X509_CERT_URL = process.env.GOOGLE_APPLICATION_CLIENT_X509_CERT_URL

module.exports = { PORT, DATABASE, ENV,  PRIVATEKEY, GOOGLE_APPLICATION_PROJECT_ID, GOOGLE_APPLICATION_TYPE, GOOGLE_APPLICATION_PRIVATE_KEY_ID, GOOGLE_APPLICATION_PRIVATE_KEY, GOOGLE_APPLICATION_CLIENT_EMAIL, GOOGLE_APPLICATION_CLIENT_ID, GOOGLE_APPLICATION_AUTH_URI, GOOGLE_APPLICATION_TOKEN_URI, GOOGLE_APPLICATION_AUTH_PROVIDER_X509_CERT_URL, GOOGLE_APPLICATION_CLIENT_X509_CERT_URL}



/*module.exports = { PORT, DATABASE, ENV, PRIVATEKEY }*/


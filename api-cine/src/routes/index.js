const routes = require('express').Router()
const handleErrors = require('./handleErrors')
const { logIn } = require('./login')

routes.use('/login', logIn)
routes.use((_req, res) => res.status(404).json('Not found'))
routes.use(handleErrors)

module.exports = { routes }
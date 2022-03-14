const routes = require('express').Router()
const handleErrors = require('./handleErrors')
const { User } = require('../db/models/user')

routes.get('/pin', (_req,res) => {
  return res.json({ msg: 'pong'})
})

routes.use((_req, res) => res.status(404).json('Not found3'))
routes.use(handleErrors) // Error catching endware.

module.exports = { routes }
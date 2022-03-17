const { User } = require('../db/models/user')
const jwt = require('jsonwebtoken')
const { PRIVATEKEY } = require('../../config')

const singUp = async (req, res, next) => {
  if (!req.body.username) return res.status(406).json({ msg: 'The username is required.' })
  if (!req.body.passwd) return res.status(406).json({ msg: 'The password is required.' })
  if (!req.body.role) return res.status(406).json({ msg: 'The role is required.' })
  if (!['admin', 'portal'].includes(req.body.role)) return res.status(406).json({ msg: 'The role must be admin or portal.' })
  try {
    const user = await User.create({ username: req.body.username, passwd: req.body.passwd, role: req.body.role })
    return res.send({ token: jwt.sign({ id: user.id, role: user.role }, PRIVATEKEY) })
  } catch (err) { next(err) }
}

module.exports = { singUp }
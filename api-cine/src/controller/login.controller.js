const { User } = require('../db/models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PRIVATEKEY } = require('../../config')

const logIn = async (req, res, next) => {
  if (!req.body.username) return res.status(406).json({ msg: 'The username is required.' })
  if (!req.body.passwd) return res.status(406).json({ msg: 'The password is required.' })
  if (!req.body.role) return res.status(406).json({ msg: 'The role is required.' })
  if (!['admin', 'portal'].includes(req.body.role)) return res.status(406).json({ msg: 'The role must be admin or portal.' })
  try {
    const user = await User.findOne({ where: { username: req.body.username, role: req.body.role }})
    const isMatch = await bcrypt.compare(req.body.passwd, user.passwd)
    if (!isMatch) return res.status(406).json({ msg: 'The password is incorrect.' })
    return res.send({ token: jwt.sign({ id: user.id, role: user.role }, PRIVATEKEY) })
  } catch (err) { next(err) }
}

module.exports = { logIn }
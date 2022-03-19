const { User } = require('../db/models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PRIVATEKEY } = require('../../config')

const logIn = async (req, res, next) => {
  if (!req.body.email) return res.status(406).json({ msg: 'The email is required.' })
  if (!req.body.passwd) return res.status(406).json({ msg: 'The password is required.' })
  try {
    const user = await User.findOne({ where: { email: req.body.email, role: req.body.role }})
    const isMatch = await bcrypt.compare(req.body.passwd, user.passwd)
    if (!isMatch) return res.status(406).json({ msg: 'The password is incorrect.' })
    return res.send({ token: jwt.sign({ id: user.id, role: user.role }, PRIVATEKEY) })
  } catch (err) { next(err) }
}

module.exports = { logIn }
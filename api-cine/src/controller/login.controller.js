const { User } = require('../db/models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PRIVATEKEY } = require('../../config')

const logIn = async (req, res, next) => {
  const { email, password } = req.body
  if (!email) return res.status(406).json({ msg: 'The email is required.' })
  if (!password) return res.status(406).json({ msg: 'The password is required.' })
  try {
    const user = await User.findOne({ where: { email: email }})
    if (!user) return res.status(406).json({ msg: 'The email is incorrect.' })
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(406).json({ msg: 'The password is incorrect.' })
    return res.send({ token: jwt.sign({ id: user.id, role: user.role }, PRIVATEKEY) })
  } catch (err) { next(err) }
}

module.exports = { logIn }
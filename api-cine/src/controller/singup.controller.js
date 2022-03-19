const { User } = require('../db/models/user')
const jwt = require('jsonwebtoken')
const { PRIVATEKEY } = require('../../config')

const singUp = async (req, res, next) => {
  if (!req.body.email) return res.status(406).json({ msg: 'The email is required.' })
  if (!req.body.passwd) return res.status(406).json({ msg: 'The password is required.' })
  const role = req.body.role || 'portal'
  try {
    const user = await User.create({ email: req.body.email, passwd: req.body.passwd, role: role })
    return res.send({ token: jwt.sign({ id: user.id, role: user.role }, PRIVATEKEY) })
  } catch (err) { next(err) }
}

module.exports = { singUp }
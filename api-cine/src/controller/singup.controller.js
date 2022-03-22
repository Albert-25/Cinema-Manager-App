const { User } = require('../db/models/user')
const jwt = require('jsonwebtoken')
const { PRIVATEKEY } = require('../../config')

const singUp = async (req, res, next) => {
  const { email, password } = req.body
  if (!email) return res.status(406).json({ msg: 'The email is required.' })
  if (!password) return res.status(406).json({ msg: 'The password is required.' })
  const role = req.body.role || 'portal'
  try {
    const user = await User.create({ email: email, password: password, role: role })
    console.log(user)
    return res.send({ token: jwt.sign({ id: user.id, role: user.role }, PRIVATEKEY) })
  } catch (err) { next(err) }
}

module.exports = { singUp }
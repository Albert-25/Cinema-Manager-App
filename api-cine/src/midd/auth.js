const jwt = require('jsonwebtoken')
const { PRIVATEKEY } = require('../../config')
const { User } = require('../db/models/user')

const auth = async (req, res, next) => {
  try {
    const authorization = req.get('authorization') || 'type token'
    const [type, token] = authorization.replace("'", "").replace("'", "").split(' ')
    if (type.toLowerCase() === 'bearer' && token) {
      const decodedUser = jwt.verify(token, PRIVATEKEY)
      const user = await User.findOne({ where: { username: decodedUser.username } })
      if (user.role === 'admin') return next()
    }
    return res.status(401).json({ msg: 'Ned authorization' })
  } catch (err) { next(err) }
}

module.exports = { auth }
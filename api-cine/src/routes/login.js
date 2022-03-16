const { User } = require('../db/models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PRIVATEKEY } = require('../../config')

const logIn = async (req, res, next) => {
  if (!req.body.username) return res.status(406).json({ msg: 'The username is required.'})
  if (!req.body.passwd) return res.status(406).json({ msg: 'The password is required.'})
  try {
    let [user] = await User.findAll()
    if (user) {
      if (user.username !== req.body.username) return res.status(406).json({ msg: 'The username is incorrect.'})
      const isMatch = await bcrypt.compare(req.body.passwd, user.passwd)
      if (!isMatch) return res.status(406).json({ msg: 'The password is incorrect.'})
    } else {
      user = await User.create({ username: req.body.username, passwd: req.body.passwd })
    }
    return res.send({ token: jwt.sign({ id: user.id, username: user.username }, PRIVATEKEY) })
  } catch (err) { next(err) }
}

module.exports = { logIn }
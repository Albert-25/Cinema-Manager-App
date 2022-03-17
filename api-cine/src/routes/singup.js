const SingUp = require("express").Router();
const { singUp } = require('../controller/singup.controller');

SingUp.post('/', singUp);

module.exports = { SingUp };
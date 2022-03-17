const LogIn = require("express").Router();
const { logIn } = require('../controller/login.controller');

LogIn.post('/', logIn);

module.exports = { LogIn };
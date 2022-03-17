const router = require("express").Router();
const { logIn } = require('../controller/login.controller');

LogrouterIn.post('/', logIn);

module.exports = router;
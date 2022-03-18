const router = require("express").Router();
const { logIn } = require('../controller/login.controller');

router.post('/', logIn);

module.exports = router;
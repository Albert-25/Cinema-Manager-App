const router = require("express").Router();
const { singUp } = require('../controller/singup.controller');

router.post('/', singUp);

module.exports = router;
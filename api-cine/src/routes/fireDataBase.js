const { Router } = require("express");
const router = Router();

//importar funciones desde el controlador aqui
const {
  allUsers,
  createUsers,
  editUsers
} = require("../controller/fireDataBase.controller");

router.get("/", allUsers);
router.post("/", createUsers);
router.get("/:id", editUsers);


module.exports = router;

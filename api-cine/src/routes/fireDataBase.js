const { Router } = require("express");
const router = Router();

//importar funciones desde el controlador aqui
const {
  allUsers,
  createUsers,
  editUsers,
  deleteUser,
  updateUser
} = require("../controller/fireDataBase.controller");

router.get("/", allUsers);
router.post("/create", createUsers);
router.get("/:id", editUsers);
router.get("/delete/:id", deleteUser);
router.post("/update/:id", updateUser);




module.exports = router;

const express = require("express");
const router = express.Router();

const userController = require("../controllers/users-controllers")

router.get("/", userController.getAllUsers)
router.post("/signup", userController.signUp)
router.post("/login", userController.login)

module.exports = router;
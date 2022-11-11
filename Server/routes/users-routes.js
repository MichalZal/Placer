const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const userController = require("../controllers/users-controllers");

// GET > api/users/
router.get("/", userController.getAllUsers);

// POST > api/users/signup
router.post(
	"/signup",
	[
		check("name").isLength({ min: 5, max: 20 }),
		check("email").normalizeEmail().isEmail(),
		check("password").isLength({ min: 3 }),
	],
	userController.signUp
);

// POST > /api/users/login
router.post("/login", userController.login);

module.exports = router;

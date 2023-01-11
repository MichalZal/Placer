const { Router } = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/users-controllers");
const fileUpload = require('../middleware/file-upload')

const router = Router();

// GET > api/users/
router.get("/", userController.getAllUsers);

// POST > api/users/signup
router.post(
	"/signup",
	fileUpload.single('image'),
	[
		check("name").isLength({ min: 5, max: 20 }),
		check("email").normalizeEmail().isEmail(),
		check("password").isLength({ min: 5 }),
	],
	userController.signUp
);

// POST > /api/users/login
router.post("/login", userController.login);

module.exports = router;

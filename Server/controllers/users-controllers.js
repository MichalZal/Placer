const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

// GET > /api/users
const getAllUsers = async (req, res, next) => {
	let allUsers;
	try {
		allUsers = await User.find({}, "-password");
		// -password usuwa wartość password z response.
	} catch (err) {
		console.log(`A problem ocurred while trying to find all users: ${err}`);
		return next(
			new HttpError("Error ocurred while trying to find all users.", 401)
		);
	}

	if (!allUsers) {
		console.log("No users found");
		return next(new HttpError("Did not find any user", 404));
	}

	res
		.status(201)
		.json({ users: allUsers.map((user) => user.toObject({ getters: true })) });
};

// POST > /api/users/signUp
const signUp = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs entered. Please check your data.", 505)
		);
	}

	const { name, email, password } = req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ email });
	} catch {
		console.log("A problem occurred while finding user");
		return next(new HttpError("Signing up failed", 500));
	}

	if (existingUser) {
		const error = new HttpError("User exist already. Please login instead.");
		return next(error);
	}

	// Przypisujemy do zmiennej model i podajemy mu dane z req.body
	const createdUser = new User({
		name,
		email,
		image:
			"https://avatars.githubusercontent.com/u/78042518?s=400&u=c382b3b50180ccfbc67e0f6db624106f016d6c23&v=4",
		password,
		place: [],
	});

	// zapisujemy do bazy danych dane tego usera.
	try {
		await createdUser.save();
	} catch (e) {
		console.log(`Error ocurred while saving user ${createdUser}`);
		return next(
			new HttpError("Something went wrong with saving user to database.", 500)
		);
	}

	res.status(201).json({ user: createdUser.toObject({ getters: true }) });
	// getters: true usuwa id, które daje monogDb do obiektów.
};

// POST > /api/users/login
const login = async (req, res, next) => {
	const { email, password } = req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ email });
	} catch {
		console.log("A problem occurred while finding user");
		return next(new HttpError("Logging in failed, try again later.", 500));
	}

	if (!existingUser || existingUser.password !== password) {
		const error = new HttpError(
			"Invalid credentials. Could not log you in.",
			401
		);
		return next(error);
	}

	res.json({ message: "Logged in" });
};

exports.getAllUsers = getAllUsers;
exports.signUp = signUp;
exports.login = login;

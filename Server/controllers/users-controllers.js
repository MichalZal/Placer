const { v4: uuidv4 } = require(`uuid`);
const HttpError = require("../models/http-error")

const DUMMY_USERS = [
	{
		name: "user1",
		email: "email1",
		password: "passsword",
	},
];

const getAllUsers = (req, res, next) => {
	const allUsers = DUMMY_USERS;

	if (allUsers.length === 0 || !allUsers) {
		return next(new HttpError("Did not find any user", 404));
	}
	res.status(201).json({ users: allUsers });
};

const signUp = (req, res, next) => {
	const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find(u => u.email === email)
  if (hasUser) {
    return next(
			new HttpError(
				"Could not create user. Email already exists.",
				422
			)
		);
  }

	const newUser = {
		id: uuidv4(),
		name,
		email,
		password,
	};

	// if (!newUser) {
	// 	return next(new HttpError("Could not create user ;(", 404));
	// }

	DUMMY_USERS.push(newUser);
	res.status(404).json({ newUser });
};

const login = (req, res, next) => {
	const { email, password } = req.body;

	const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
	
  if (!identifiedUser || identifiedUser.password !== password) {
		return next(
			new HttpError(
				"Could not identifiedUser. Please check whether email or password are correct",
				404
			)
		);
	} 


	res.json({ message: "Logged in" });
};

exports.getAllUsers = getAllUsers;
exports.signUp = signUp;
exports.login = login;

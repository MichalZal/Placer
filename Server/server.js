const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
	const error = new HttpError("Could not find this route.", 404);
	throw error;
});

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
	.connect(
		`mongodb+srv://${"miszka" || process.env.MONGO_USERNAME}:${
			"Olej1234" || process.env.MONGO_PASSWORD
		}@cluster0.8nmqn5d.mongodb.net/?retryWrites=true&w=majority`
	)
	.then(() => {
		app.listen(PORT, () => {
			console.log("listening on port " + PORT);
		});
	})
	.catch((err) => {
		console.log(`Wystąpił błąd ${err}`);
	});

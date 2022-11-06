const dotenv = require("dotenv").config();
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

// Middleware dla nieznalezionych scieżek
app.use((req, res, next) => {
	const error = new HttpError("Could not find this route.", 404);
	throw error;
});

// Middleware obsługujący błędy, które aktywuje funkcja next()
app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || "An unknown error occurred!" });
});

// POłączenie z bazą. 
mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_USERNAME}:${
			process.env.MONGO_PASSWORD
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

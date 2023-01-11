const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();
const PORT = process.env.PORT || 5000;

// middleware parsujący przychodzące JSON dane na obiekty JS
app.use(bodyParser.json());

//
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, x-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

	next();
});

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
		`mongodb+srv://Miszekadmin:Olej1234@cluster0.8nmqn5d.mongodb.net/mern?retryWrites=true&w=majority`
	)
	.then(() => {
		app.listen(PORT, () => {
			console.log("listening on port " + PORT);
		});
	})
	.catch((err) => {
		console.log(`Wystąpił błąd ${err}`);
	});

const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");

const PORT = process.env.PORT || 5000;
const app = express();

app.use("/api/places", placesRoutes);

// funkcja obłsugująca errory. Jeśli w jakiejś siceżce podamy next() 
// lub throw new Error() to obiekt scieżka pokieruje nas tutaj i 
// obiekt error pójdzie to tej funkcji
app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(PORT, () => {
	console.log("listening on port " + PORT);
});

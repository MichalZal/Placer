const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
	{
		id: "p1",
		title: "Pałąc nauki i kultury",
		description: "One of the best buildings in Poland",
		location: {
			lat: 40.723423,
			lng: -42.1231,
		},
		address: "Poland, Warszawa",
		creator: "u1",
	},
	{
		id: "p2",
		title: "Pałąc nauki i kultury",
		description: "One of the best buildings in Poland",
		location: {
			lat: 40.723423,
			lng: -42.1231,
		},
		address: "Poland, Warszawa",
		creator: "u2",
	},
	{
		id: "p3",
		title: "Pałąc nauki i kultury",
		description: "One of the best buildings in Poland",
		location: {
			lat: 40.723423,
			lng: -42.1231,
		},
		address: "Poland, Warszawa",
		creator: "u2",
	},
];

// api/places/:pid
const getPlaceById = (req, res, next) => {
	console.log("GET request to places");
	const placeId = req.params.pid;

	const place = DUMMY_PLACES.find((p) => p.id === placeId);

	if (!place) {
		throw new HttpError("Could not find place for a provided id", 404);
	}
	res.json({ place });
};

// api/places/user/:uid
const getPlaceByUserId = (req, res, next) => {
	console.log("GET request to places/user/");
	const userId = req.params.uid;

	const userPlaces = DUMMY_PLACES.find((p) => p.creator === userId);
	// console.log(userPlaces)

	if (!userPlaces) {
		// return next powoduje do przekeirwoania zapytania do kolejnej sciezki
		// app.use czyli nasz handler errorów.
		return next(
			new HttpError("Could not find place for a provided user id", 404)
		);
	}

	res.json(userPlaces);
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId  = getPlaceByUserId;

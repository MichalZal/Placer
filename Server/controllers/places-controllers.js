const { v4: uuidv4 } = require(`uuid`);
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../utils/location");
const Place = require("../models/place");

let DUMMY_PLACES = [
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

// GET api/places/:pid
const getPlaceById = async (req, res, next) => {
	const placeId = req.params.pid;
	let place;

	// Zapytanie do mongo przez model Place i metodę findById(id).
	try {
		place = await Place.findById(placeId);
	} catch (err) {
		console.error(`Error with finding user occurred: ${err}`);
		const error = new HttpError("We could not find a place with that id", 500);
		return next(error);
	}

	if (!place) {
		const error = new HttpError("We could not find a place with that id", 404);
		return next(error);
	}

	res.json({ place: place.toObject({ getters: true }) }).status(200);
};

// GET api/places/user/:uid
const getPlacesByUserId = async (req, res, next) => {
	const userId = req.params.uid;
	let places;

	try {
		places = await Place.find({ creator: userId });
		// Zwraca array.
	} catch (err) {
		console.log(`Error with finding place by uid: ${err}`);
		return next(
			new HttpError("Could not find places for a provided user id", 5000)
		);
	}

	if (!places || places.length === 0) {
		// return next powoduje do przekeirwoania zapytania do kolejnej sciezki do
		// app.use czyli nasz handler errorów.
		return next(
			new HttpError("Could not find places for a provided user id", 404)
		);
	}

	res.json({
		places: places.map((place) => place.toObject({ getters: true })),
	});
};

// POST api/places/
const createPlace = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs entered. Please check your data.", 422)
		);
	}

	const { title, description, address, creator } = req.body;

	// let coordinates;
	// try {
	// 	coordinates = await getCoordsForAddress(address);
	// } catch (err) {
	// 	return next(err);
	// }

	const createdPlace = new Place({
		title,
		description,
		address,
		location: {
			lat: 12.123123,
			lng: 12.534524,
		},
		image:
			"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
		creator,
	});

	try {
		await createdPlace.save();
	} catch (err) {
		const error = new HttpError("Creating place faild, please try again", 500);
		return next(error);
	}

	res.status(201).json({ place: createdPlace });
};

// PATCH api/places/:pid
const updatePlace = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs entered. Please check your data.")
		);
	}

	const { title, description } = req.body;
	const placeId = req.params.pid;

	let place;
	try {
		place = await Place.findById(placeId);
	} catch (err) {
		console.log(`Error occurred while modifying place: ${err}`);
		return next(
			new HttpError("Something went wrong with updating this place.", 500)
		);
	}

	// zmieniamy title i description na referencji
	place.title = title;
	place.description = description;

	// zamieniamy element na referencje
	try {
		await place.save();
	} catch (e) {
		console.log(`Error occurred while saving modified place: ${err}`);
		return next(
			new HttpError("Something went wrong with saving updated place.", 500)
		);
	}

	res.status(200).json({ place: place.toObject({ getters: true }) });
};

// DELETE api/places/:pid
const deletePlace = (req, res, next) => {
	const placeId = req.params.pid;

	if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
		return next(new HttpError(`Could not find a place with id ${placeId}`));
	}

	DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

	res.status(200).json({ message: `Deleted place with id ${placeId}` });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;

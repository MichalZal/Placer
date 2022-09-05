const { v4: uuidv4 } = require(`uuid`);
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../utils/location")

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
const getPlacesByUserId = (req, res, next) => {
	console.log("GET request to places/user/");
	const userId = req.params.uid;

	const userPlaces = DUMMY_PLACES.filter((p) => p.creator === userId);
	// console.log(userPlaces)

	if (!userPlaces || userPlaces.length === 0) {
		// return next powoduje do przekeirwoania zapytania do kolejnej sciezki
		// app.use czyli nasz handler errorów.
		return next(
			new HttpError("Could not find places for a provided user id", 404)
		);
	}

	res.json({ userPlaces });
};

// api/places/
const createPlace = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs entered. Please check your data.")
		);
	}

	const { title, description, address, creator } = req.body;

	let coordinates;
	try {
		coordinates = await getCoordsForAddress(address)
	} catch (err) {
		return next(err)
	}

	const createdPlace = {
		id: uuidv4(),
		title,
		description,
		location: coordinates,
		address,
		creator,
	};
	DUMMY_PLACES.push(createdPlace);

	res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs entered. Please check your data.")
		);
	}
	
	const { title, description } = req.body;
	const placeId = req.params.pid;

	// Tworzymy kopię, która jest referencją do tego elemetnu z obiektu
	const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };

	// bierzemy index tego elementu
	const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

	// zmieniamy title i description na referencji
	updatedPlace.title = title;
	updatedPlace.description = description;

	// zamieniamy element na referencje
	DUMMY_PLACES[placeIndex] = updatedPlace;

	res.status(200).json({ place: updatedPlace });
};

// api/places/:pid
const deletePlace = (req, res, next) => {
	const placeId = req.params.pid;

	if (!DUMMY_PLACES.find(p => p.id === placeId)) {
		return next(
			new HttpError(`Could not find a place with id ${placeId}`)
		);
	}
	
	DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

	res.status(200).json({ message: `Deleted place with id ${placeId}` });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;

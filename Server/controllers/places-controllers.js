const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../utils/location");
const Place = require("../models/place");
const User = require("../models/user");

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

	let userWithPlaces;
	try {
		userWithPlaces = await User.findById(userId).populate("place");
		// Zwraca array.
	} catch (err) {
		console.log(`Error with finding place by uid: ${err}`);
		return next(
			new HttpError("Could not find places for a provided user id", 5000)
		);
	}

	if (!userWithPlaces || userWithPlaces.place.length === 0) {
		// return next powoduje do przekeirwoania zapytania do kolejnej sciezki do
		// app.use czyli nasz handler errorów.
		return next(
			new HttpError("Could not find places for a provided user id", 404)
		);
	}

	res.json({
		places: userWithPlaces.place.map((place) =>
			place.toObject({ getters: true })
		),
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

	let user;
	try {
		user = await User.findById(creator);
	} catch (err) {
		return next(new HttpError("Creating place failed. Please try again", 500));
	}

	if (!user) {
		return next(
			new HttpError("We could not find user with the provided id.", 404)
		);
	}

	console.log(user);

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await createdPlace.save({ session: sess });
		user.place.push(createdPlace);
		await user.save();
		sess.commitTransaction();
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
const deletePlace = async (req, res, next) => {
	const placeId = req.params.pid;

	let place;
	try {
		place = await Place.findById(placeId).populate("creator");
	} catch (err) {
		console.log(`Error occurred while finding this place: ${err}`);
		return next(
			new HttpError("Something went wrong with finding this place.", 500)
		);
	}

	if (!place) {
		return next(new HttpError("Could not find place for this id", 404));
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await place.remove({ session: sess });
		place.creator.place.pull(place);
		await place.creator.save({ session: sess });
		sess.commitTransaction();
		// te linki tworzą sesje. usuwają dane miejsce i potem jeszcze uswuają jego id w modelu User.
	} catch (err) {
		console.log(`Error occurred while deleting place: ${err}`);
		return next(
			new HttpError("Something went wrong with deleting this place.", 500)
		);
	}

	res.status(200).json({ message: "Place deleted." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;

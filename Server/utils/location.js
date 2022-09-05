const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = "AIzaSyDhD6M2YwBmXmJIpli10lleOMh2KxKE6Hc";

const getCoordsForAddress = async (address) => {
	// return { lat: 40.3534, lng: -43.2343 };

	const res = await axios.get(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
			address
		)}&key=${API_KEY}`
	);

	const data = res.data;

	if (!data || data.status === "ZERO_RESULTS") {
		const error = new HttpError(
			"Could not find location for the specified address.",
			422
		);
    throw error;
	}

  const coordinates = data.results[0].geometry.location;
  return coordinates
};

module.exports = getCoordsForAddress;

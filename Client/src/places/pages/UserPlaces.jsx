import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
	{
		id: "p1",
		title: "Pałac nauki i kultury",
		description: "Best Poland building",
		imageUrl:
			"https://s3.eu-central-1.amazonaws.com/pressland-cms/cache/article_show_cover/cv/palac-kultury-i-nauki-w-warszawie.jpeg",
		location: {
			lat: 52.231718736894,
			lng: 21.006047888954,
		},
		address: "Warszawa Poland",
		creator: "u1",
	},
	{
		id: "p2",
		title: "Pałac nauki i kultury",
		description: "Best Poland building",
		imageUrl:
			"https://s3.eu-central-1.amazonaws.com/pressland-cms/cache/article_show_cover/cv/palac-kultury-i-nauki-w-warszawie.jpeg",
		location: {
			lat: 52.231718736894,
			lng: 21.006047888954,
		},
		address: "Warszawa Poland",
		creator: "u2",
	},
];

const UserPlaces = () => {
	const params = useParams();
	const userId = params.userId;

	const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);

	return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;

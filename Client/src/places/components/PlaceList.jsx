import React from "react";

import "./PlaceList.scss";
import Card from "../../UI/Card/Card";
import PlaceItem from "./PlaceItem";

const PlaceList = ({ items }) => {
	if (items.length === 0) {
		return (
			<div className="center">
				<Card className="no-places">
					<h2>No places found. Maybe create one?</h2>
					<button>Share Place</button>
				</Card>
			</div>
		);
	}

	return (
		<ul className="place-list">
			{items.map((place) => (
				<PlaceItem
					key={place.id}
					id={place.id}
					image={place.imageUrl}
					title={place.title}
					description={place.description}
					address={place.address}
					createdBy={place.creator}
					coordinates={place.location}
				/>
			))}
		</ul>
	);
};

export default PlaceList;

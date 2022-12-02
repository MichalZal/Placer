import React from "react";

import "./PlaceList.scss";
import Card from "../../UI/Card/Card";
import PlaceItem from "./PlaceItem";
import Button from '../../UI/FormElements/Button'

const PlaceList = ({ items, onDeletePlace }) => {
	if (items.length === 0) {
		return (
			<div className="center">
				<Card className="no-places">
					<h2>No places found. Maybe create one?</h2>
					<Button to="/places/new">Share Place</Button>
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
					image={place.image}
					title={place.title}
					description={place.description}
					address={place.address}
					createdBy={place.creator}
					coordinates={place.location}
					onDelete={onDeletePlace}
				/>
			))}
		</ul>
	);
};

export default PlaceList;

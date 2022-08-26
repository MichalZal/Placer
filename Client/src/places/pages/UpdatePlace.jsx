import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../UI/FormElements/Input";
import Button from "../../UI/FormElements/Button";
import { useForm } from "../../hooks/form-hook";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from "../../UI/utils/validators";
import "./PlaceForm.scss";

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

const UpdatePlace = () => {
	const { placeId } = useParams();
	const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

	const [formState, inputHandler] = useForm(
		{
			title: {
				value: identifiedPlace.title,
				isValid: true,
			},
			description: {
				value: identifiedPlace.description,
				isValid: true,
			},
		},
		true
	);

	if (!identifiedPlace) {
		return (
			<div className="center">
				<h2>Could not find that place :(</h2>
			</div>
		);
	}

	const placeUpdateSubmitHandler = (e) => {
		e.preventDefault();
		console.log(formState.inputs);
	};

	return (
		<form className="place-form" onSubmit={placeUpdateSubmitHandler}>
			<Input
				id="title"
				element="input"
				type="text"
				label="title"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid title"
				onInput={inputHandler}
				initialValue={formState.inputs.title.value}
				initialValid={formState.inputs.title.isValid}
			/>
			<Input
				id="description"
				element="textarea"
				label="Description"
				validators={[VALIDATOR_MINLENGTH(5)]}
				errorText="Please enter a valid description. Min 5 characters"
				onInput={inputHandler}
				initialValue={formState.inputs.description.value}
				initialValid={formState.inputs.description.isValid}
			/>
			<Button type="submit" disabled={!formState.isValid}>
				Update Place
			</Button>
		</form>
	);
};

export default UpdatePlace;

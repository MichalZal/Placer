import React from "react";

import "./PlaceForm.scss";
import Input from "../../UI/FormElements/Input";
import Button from "../../UI/FormElements/Button";
import { useForm } from "../../hooks/form-hook";
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../UI/utils/validators";

const NewPlace = () => {
	const [formState, inputHandler] = useForm(
		{
			title: {
				value: "",
				isValid: false,
			},
			description: {
				value: "",
				isValid: false,
			},
			address: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const placeSubmitHandler = (e) => {
		e.preventDefault();
		console.log(formState.inputs);
		// fetch('http://localhost:3000/', { })
	};

	return (
		<form className="place-form" onSubmit={placeSubmitHandler}>
			<Input
				element="input"
				label="Add new Place"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a Valid title."
				id="title"
				onInput={inputHandler}
			/>
			<Input
				element="Textarea"
				label="Description"
				id="description"
				validators={[VALIDATOR_MINLENGTH(5)]}
				errorText="Please, enter a valid description."
				onInput={inputHandler}
			/>
			<Input
				element="input"
				label="Address"
				id="address"
				validators={[VALIDATOR_MINLENGTH(1)]}
				errorText="Please, enter a valid address."
				onInput={inputHandler}
			/>
			<Button type="submit" disabled={!formState.isValid}>
				Add Place
			</Button>
		</form>
	);
};

export default NewPlace;

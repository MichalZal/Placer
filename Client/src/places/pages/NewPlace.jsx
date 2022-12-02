import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./PlaceForm.scss";
import Input from "../../UI/FormElements/Input";
import Button from "../../UI/FormElements/Button";
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../UI/utils/validators";
import useHttpClient from "../../hooks/http-hook";
import { useForm } from "../../hooks/form-hook";
import ErrorModal from "../../UI/LoadingSpinner/ErrorModal";
import { MAIN_ROUTE } from "../../constans";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";

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
	const { userId } = useContext(AuthContext);
	const { isLoading, error, clearError, sendRequest } = useHttpClient();
	const history = useHistory();

	const placeSubmitHandler = async (e) => {
		e.preventDefault();

		const createdPlace = {
			title: formState.inputs.title.value,
			description: formState.inputs.description.value,
			address: formState.inputs.address.value,
			creator: userId,
		};

		try {
			const resData = await sendRequest(
				`${MAIN_ROUTE}/places`,
				"POST",
				JSON.stringify(createdPlace),
				{
					'Content-Type': 'application/json'
				}
			);
			history.push(`/`);
		} catch (err) {
			throw new Error(err.message);
		}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<form className="place-form" onSubmit={placeSubmitHandler}>
				{isLoading && <LoadingSpinner asOverlay/>}
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
		</React.Fragment>
	);
};

export default NewPlace;

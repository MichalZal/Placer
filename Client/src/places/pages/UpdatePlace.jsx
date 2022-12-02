import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import "./PlaceForm.scss";
import { AuthContext } from "../../context/auth-context";
import Input from "../../UI/FormElements/Input";
import Button from "../../UI/FormElements/Button";
import Card from "../../UI/Card/Card";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../UI/LoadingSpinner/ErrorModal";
import { useForm } from "../../hooks/form-hook";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from "../../UI/utils/validators";
import { useHttpClient } from "../../hooks/http-hook";
import { MAIN_ROUTE } from "../../constans";

const UpdatePlace = () => {
	const { placeId } = useParams();
	const { isLoading, sendRequest, error, clearError } = useHttpClient();
	const [loadedPlace, setLoadedPlace] = useState();
	const history = useHistory();
  const { userId } = useContext(AuthContext)

	const [formState, inputHandler, setFormData] = useForm(
		{
			title: {
				value: "",
				isValid: false,
			},
			description: {
				value: "",
				isValid: false,
			},
		},
		false
	);


  // Pobranie miejsca z bazy
	useEffect(() => {
		const fetchPlaceById = async () => {
			try {
				const resData = await sendRequest(`${MAIN_ROUTE}/places/${placeId}`);
				setLoadedPlace(resData.place);
				setFormData(
					{
						title: {
							value: resData.place.title,
							isValid: true,
						},
						description: {
							value: resData.place.description,
							isValid: true,
						},
					},
					true
				);
			} catch (err) {
				throw new Error(err.message);
			}
		};
		fetchPlaceById();
	}, [sendRequest, placeId, setFormData]);

	const placeUpdateSubmitHandler = async (event) => {
		event.preventDefault();

		const updatedPlace = {
			title: formState.inputs.title.value,
			description: formState.inputs.description.value,
		};

		// ten request nadpisuje wartości z bazy:
		try {
			await sendRequest(
				`${MAIN_ROUTE}/places/${placeId}`,
				"PATCH",
				JSON.stringify(updatedPlace),
				{
					"Content-Type": "application/json",
				}
			);
			history.push(`/${userId}/places`);
		} catch (err) {
			console.error(err.message);
		}
	};

	if (isLoading) {
		return (
			<div className="center">
				<LoadingSpinner />
			</div>
		);
	}

	if (!loadedPlace) {
		return (
			<div className="center">
				<Card className="card-padding">
					<h2>Could not find place!</h2>
				</Card>
			</div>
		);
	}

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{!isLoading && loadedPlace && (
				<form className="place-form" onSubmit={placeUpdateSubmitHandler}>
					<Input
						id="title"
						element="input"
						type="text"
						label="Title"
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please enter a valid title."
						onInput={inputHandler}
						initialValue={loadedPlace.title}
						initialValid={true}
					/>
					<Input
						id="description"
						element="textarea"
						label="Description"
						validators={[VALIDATOR_MINLENGTH(5)]}
						errorText="Please enter a valid description (min. 5 characters)."
						onInput={inputHandler}
						initialValue={loadedPlace.description}
						initialValid={true}
					/>
					<Button type="submit" disabled={!formState.isValid}>
						UPDATE PLACE
					</Button>
				</form>
			)}
		</React.Fragment>
	);
};

export default UpdatePlace;

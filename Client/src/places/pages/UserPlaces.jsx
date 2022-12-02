import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../../hooks/http-hook.js";
import PlaceList from "../components/PlaceList";
import { MAIN_ROUTE } from "../../constans.js";
import ErrorModal from "../../UI/LoadingSpinner/ErrorModal.jsx";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner.jsx";

const UserPlaces = () => {
	const userId = useParams().userId;
	const [loadedPlaces, setLoadedPlaces] = useState([]);
	const { isLoading, sendRequest, error, clearError } = useHttpClient();

	useEffect(() => {
		const fetchPlacesByUserId = async () => {
			try {
				const resData = await sendRequest(
					`${MAIN_ROUTE}/places/user/${userId}`
				);
				setLoadedPlaces(resData.places);
			} catch (err) {}
		};
		fetchPlacesByUserId();
	}, [sendRequest, userId]);

	const placeDeletedHandler = (deletedPlaceId) => {
		setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId))
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedPlaces && (
				<PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
			)}
			;
		</React.Fragment>
	);
};

export default UserPlaces;

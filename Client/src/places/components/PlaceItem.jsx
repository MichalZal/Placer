import React, { useState, useContext } from "react";

import "./PlaceItem.scss";
import { useHttpClient } from "../../hooks/http-hook";
import Card from "../../UI/Card/Card";
import Button from "../../UI/FormElements/Button";
import Modal from "../../UI/Modal/Modal";
import Map from "../../UI/Map/Map";
import { AuthContext } from "../../context/auth-context";
import { MAIN_ROUTE } from "../../constans";
import ErrorModal from "../../UI/LoadingSpinner/ErrorModal";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";

const PlaceItem = ({ id, image, title, address, description, coordinates, onDelete }) => {
	const { sendRequest, isLoading, error, clearError } = useHttpClient();
	const [showMap, setShowMap] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const { isLoggedIn } = useContext(AuthContext);

	const openMapHandler = () => setShowMap(true);
	const closeMapHandler = () => setShowMap(false);

	const showDeleteWarning = () => setShowConfirmModal(true);
	const closeDeleteWarning = () => setShowConfirmModal(false);

	const confirmDeleteHandler = async () => {
		closeDeleteWarning();
		try {
			await sendRequest(`/${MAIN_ROUTE}/places/${id}`, "DELETE");
		} catch (err) {}
		onDelete(id)
	};

	return (
		<>
			<ErrorModal error={error} onClear={clearError}/>
			<Modal
				show={showMap}
				onCancel={closeMapHandler}
				header={address}
				contentClass="place-item__modal-content"
				footerClass="place-item__modal-actions"
				footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
			>
				<div className="map-container">
					<Map center={coordinates} zoom={16} />
				</div>
			</Modal>
			<Modal
				show={showConfirmModal}
				onCancel={closeDeleteWarning}
				header="Are you sure?"
				footerClass="place-item__modal-actions"
				footer={
					<>
						<Button inverse onClick={closeDeleteWarning}>
							CANCEL
						</Button>
						<Button danger onClick={confirmDeleteHandler}>
							DELETE
						</Button>
					</>
				}
			>
				<p>
					Do you want to proceed and delete this place? Please note that it
					can't be undone after this action
				</p>
			</Modal>
			<li className="place-item">
				<Card className="place-item__content">
					{isLoading && <LoadingSpinner asOverlay/>}
					<div className="place-item__image">
						<img src={image} alt={title} />
					</div>
					<div className="place-item__info">
						<h2>{title}</h2>
						<h3>{address}</h3>
						<p>{description}</p>
					</div>
					<div className="place-item__actions">
						<Button onClick={openMapHandler} inverse>
							VIEW ON MAP
						</Button>
						{isLoggedIn && (
							<>
								<Button to={`/places/${id}`}>EDIT</Button>
								<Button danger onClick={showDeleteWarning}>
									DELETE
								</Button>
							</>
						)}
					</div>
				</Card>
			</li>
		</>
	);
};

export default PlaceItem;

import React, { useState, useContext } from "react";

import "./PlaceItem.scss";
import Card from "../../UI/Card/Card";
import Button from "../../UI/FormElements/Button";
import Modal from "../../UI/Modal/Modal";
import Map from "../../UI/Map/Map";
import { AuthContext } from "../../context/auth-context";

const PlaceItem = (
	{ id, image, title, address, description, coordinates },
	props
) => {
	const [showMap, setShowMap] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const { isLoggedIn } = useContext(AuthContext);

	const openMapHandler = () => setShowMap(true);
	const closeMapHandler = () => setShowMap(false);

	const showDeleteWarning = () => setShowConfirmModal(true);
	const closeDeleteWarning = () => setShowConfirmModal(false);

	const confirmDeleteHandler = () => {
		console.log("deleting place...");
		closeDeleteWarning();
	};

	return (
		<>
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

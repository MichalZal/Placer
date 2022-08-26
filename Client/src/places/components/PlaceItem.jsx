import React, { useState } from "react";

import "./PlaceItem.scss";
import Card from "../../UI/Card/Card";
import Button from "../../UI/FormElements/Button";
import Modal from "../../UI/Modal/Modal";
import Map from '../../UI/Map/Map'

const PlaceItem = ({ id, image, title, address, description, coordinates }, props) => {
	const [showMap, setShowMap] = useState(false);

	const openMapHandler = () => setShowMap(true);
	const closeMapHandler = () => setShowMap(false);

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
          <Map center={coordinates} zoom={16}/>
        </div>
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
						<Button onClick={openMapHandler} inverse>VIEW ON MAP</Button>
						<Button to={`/places/${id}`}>EDIT</Button>
						<Button danger>DELETE</Button>
					</div>
				</Card>
			</li>
		</>
	);
};

export default PlaceItem;

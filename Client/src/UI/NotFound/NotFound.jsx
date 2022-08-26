import React from "react";
import { useHistory } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

import "./NotFound.scss";

const NotFound = () => {
	const location = useHistory();

	const redirectToHome = () => {
		location.push("/");
	};

	return (
		<div className="not-found">
			<div className="not-found__arrow" onClick={redirectToHome}>
				<BsArrowLeft />
			</div>
			<p className="not-found__text">404 Page not found.</p>
		</div>
	);
};

export default NotFound;

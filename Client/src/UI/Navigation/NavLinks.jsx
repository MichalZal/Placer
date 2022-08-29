import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import Button from "../../UI/FormElements/Button";
import "./NavLinks.scss";

const NavLinks = () => {
	const { isLoggedIn, logout } = useContext(AuthContext);
	const history = useHistory();

	const logoutHandler = () => {
		logout();
		history.replace({ pathname: "/" });
	};

	return (
		<ul className="nav-links">
			<li className="nav-link">
				<NavLink exact to="/">
					All Users
				</NavLink>
			</li>
			{isLoggedIn && (
				<li className="nav-link">
					<NavLink to={`/u1/places`}>My Places</NavLink>
				</li>
			)}
			{isLoggedIn && (
				<li className="nav-link">
					<NavLink to={`/places/new`}>New Place</NavLink>
				</li>
			)}
			{!isLoggedIn && (
				<li className="nav-link">
					<NavLink to={`/auth`}>Authenticate</NavLink>
				</li>
			)}
			{isLoggedIn && (
				<li>
					<Button onClick={logoutHandler}>LOGOUT</Button>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;

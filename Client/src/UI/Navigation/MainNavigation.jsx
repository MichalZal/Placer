import React, { useState } from "react";
import "./MainNavigation.scss";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";

const MainNavigation = (props) => {
	const [drawerIsOpen, setDrawerIsOpen] = useState(null);

	const closeDrawer = () => {
		setDrawerIsOpen(false)
	}

	return (
		<>
			<SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
				<nav className="main-navigation__drawer-nav">
					<NavLinks />
				</nav>
			</SideDrawer>
			<MainHeader>
				<h1 className="main-navigation__title">
					<Link to="/">Placer</Link>
				</h1>
				<nav className="main-navigation__header-nav">
					<NavLinks />
				</nav>
				<button
					className="main-navigation__menu-btn"
					onClick={() => {
						setDrawerIsOpen((prev) => !prev);
					}}
				>
					<span ></span>
					<span ></span>
					<span ></span>
				</button>
			</MainHeader>
		</>
	);
};

export default MainNavigation;

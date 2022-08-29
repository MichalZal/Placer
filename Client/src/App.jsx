import React, { useState, useCallback, Suspense } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";

import { AuthContext } from "./context/auth-context";

const Users = React.lazy(() => import("./user/pages/Users"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const MainNavigation = React.lazy(() => import("./UI/Navigation/MainNavigation"));
const Auth = React.lazy(() => import("./user/pages/Auth"));
const NotFound = React.lazy(() => import("./UI/NotFound/NotFound"));


const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = useCallback(() => {
		setIsLoggedIn(true);
	}, []);

	const logout = useCallback(() => {
		setIsLoggedIn(false);
	}, []);

	let routes;

	if (isLoggedIn) {
		routes = (
			<Switch>
				<Route exact path="/">
					<Users />
				</Route>
				<Route exact path="/:userId/places">
					<UserPlaces />
				</Route>
				<Route exact path="/places/new">
					<NewPlace />
				</Route>
				<Route path="/places/:placeId">
					<UpdatePlace />
				</Route>
				<Route path="/not-found">
					<NotFound />
				</Route>
				<Redirect to="/not-found" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route exact path="/">
					<Users />
				</Route>
				<Route exact path="/:userId/places">
					<UserPlaces />
				</Route>
				<Route path="/auth">
					<Auth />
				</Route>
				<Route path="/not-found">
					<NotFound />
				</Route>
				<Redirect to="/not-found" />
			</Switch>
		);
	}

	return (
		<Router>
			<AuthContext.Provider
				value={{
					isLoggedIn: isLoggedIn,
					login,
					logout,
				}}
			>
				<Suspense fallback={<div>Loading</div>}>
					<MainNavigation />
					<main>{routes}</main>
				</Suspense>
			</AuthContext.Provider>
		</Router>
	);
};

export default App;

import React, { useState, useCallback, Suspense } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";

import { AuthContext } from "./context/auth-context";
import LoadingSpinner from "./UI/LoadingSpinner/LoadingSpinner";

// Import komponentów w sposób lazy
const Users = React.lazy(() => import("./user/pages/Users"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const MainNavigation = React.lazy(() =>
	import("./UI/Navigation/MainNavigation")
);
const Auth = React.lazy(() => import("./user/pages/Auth"));
const NotFound = React.lazy(() => import("./UI/NotFound/NotFound"));

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState(null)

	const login = useCallback((uid) => {
		setIsLoggedIn(true);
		setUserId(uid)
	}, []);

	const logout = useCallback(() => {
		setIsLoggedIn(false);
		setUserId(null)
	}, []);

	let routes;

	// Nasze scieżki zmienią się w zależności od kontekstu 
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

	console.log(process.env.MAIN_ROUTE)

	return (
		<Router>
			<AuthContext.Provider
				value={{
					isLoggedIn,
					login,
					logout,
					userId,
				}}
			>
				<Suspense
					fallback={
						<div className="center">
							<LoadingSpinner />
						</div>
					}
				>
					<MainNavigation />
					<main>{routes}</main>
				</Suspense>
			</AuthContext.Provider>
		</Router>
	);
};

export default App;

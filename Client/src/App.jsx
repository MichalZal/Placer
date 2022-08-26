import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./UI/Navigation/MainNavigation";
import UserPlaces from './places/pages/UserPlaces'
import NotFound from "./UI/NotFound/NotFound"

const App = () => {
	return (
		<Router>
			<MainNavigation />
			<main>
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
					<Route path="not-found">
						<NotFound />
					</Route>
					<Redirect to="/not-found" />
				</Switch>
			</main>
		</Router>
	);
};

export default App;

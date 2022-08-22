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

const App = () => {
	return (
		<Router>
			<MainNavigation />
			<main>
				<Switch>
					<Route exact path="/">
						<Users />
					</Route>
					<Route exact path="/places/new">
						<NewPlace />
					</Route>
					<Route pah="/:userId/places"></Route>
					<Redirect to="/" />
				</Switch>
			</main>
		</Router>
	);
};

export default App;

import React from "react";
import "./UserList.scss";

import UserItem from "./UserItem";
import Card from "../../UI/Card/Card";

const UserList = ({ items }) => {
	if (items.length === 0) {
		return (
			<div className="center">
				<Card className="user-list__not-found">
					<h2>No users found.</h2>
				</Card>
			</div>
		);
	}

	return (
		<ul className="users-list">
			{items.map((user) => (
				<UserItem
					key={user.id}
					id={user.id}
					image={user.image}
					name={user.name}
					placeCount={user.place.length}
				/>
			))}
		</ul>
	);
};

export default UserList;

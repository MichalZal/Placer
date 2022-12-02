import React, { useEffect, useState } from "react";

import UsersList from "../components/UserList";
import ErrorModal from "../../UI/LoadingSpinner/ErrorModal";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import useHttpClient from "../../hooks/http-hook";
import {MAIN_ROUTE} from "../../constans";

const Users = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient()
	const [loadedUsers, setLoadedUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const resData = await sendRequest(`${MAIN_ROUTE}/users`);

				setLoadedUsers(resData.users);
			} catch (e) {
				throw new Error(e.message)
			}
		};

		fetchUsers();
	}, [sendRequest]);

  console.log(loadedUsers)

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
		</React.Fragment>
	);
};

export default Users;

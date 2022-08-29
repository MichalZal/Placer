import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom'
import Card from "../../UI/Card/Card";

import "./Auth.scss";
import { useForm } from "../../hooks/form-hook";
import Input from "../../UI/FormElements/Input";
import Button from "../../UI/FormElements/Button";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
	VALIDATOR_EMAIL,
} from "../../UI/utils/validators";
import { AuthContext } from '../../context/auth-context'

const Auth = () => {
	const [isLoginMode, setIsLoginMode] = useState(true);
	const { login } = useContext(AuthContext)
	const history = useHistory()

	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: "",
				isValid: false,
			},
			password: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const switchModeHandler = () => {
		if (!isLoginMode) {
			setFormData(
				{
          ...formState.inputs,
					name: undefined,
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					name: {
						value: "",
						isValid: false,
					},
				},
				false
			);
		}
		setIsLoginMode((prev) => !prev);
	};

	const authSubmissionHandler = (e) => {
		e.preventDefault();
		console.log(formState.inputs);
		login()
		history.replace({pathname: '/'})
	};

	return (
		<Card className="auth card-padding">
			<h2 className="auth-caption"> {isLoginMode ? "Login" : "Sign up"}</h2>
			<form onSubmit={authSubmissionHandler} className="auth-form">
				{!isLoginMode && (
					<Input
						element="input"
						id="name"
						type="text"
						label="Your Name"
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please enter a valid name."
						onInput={inputHandler}
					/>
				)}
				<Input
					className="auth-input"
					id="email"
					type="email"
					label="E-mail"
					validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL]}
					errorText="Please enter a valid email."
					element="input"
					initialValue={formState.inputs.email.value}
					initialValidate={formState.inputs.email.isValid}
					onInput={inputHandler}
				/>
				<Input
					id="password"
					className="auth-input"
					type="password"
					label="Password"
					element="input"
					validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
					errorText="Please enter a valid password."
					initialValue={formState.inputs.password.value}
					initialValidate={formState.inputs.password.isValid}
					onInput={inputHandler}
				/>
				<Button
					type="submit"
					disabled={!formState.isValid}
					className="auth-submit"
				>
					{isLoginMode ? "Login" : "Sign up"}
				</Button>
			</form>
			<footer className="auth-footer">
				<Button className="auth-switch" inverse onClick={switchModeHandler}>
					Switch To {!isLoginMode ? "Login" : "Sign up"}
				</Button>
			</footer>
		</Card>
	);
};

export default Auth;

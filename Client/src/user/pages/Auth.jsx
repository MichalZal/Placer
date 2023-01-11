import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Card from "../../UI/Card/Card";

import "./Auth.scss";
import { useForm } from "../../hooks/form-hook";
import Input from "../../UI/FormElements/Input";
import Button from "../../UI/FormElements/Button";
import ErrorModal from "../../UI/LoadingSpinner/ErrorModal";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import useHttpClient from "../../hooks/http-hook";
import ImageUpload from "../../UI/FormElements/imageUpload";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from "../../UI/utils/validators";
import { AuthContext } from "../../context/auth-context";

const Auth = () => {
  const { login } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

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
          image: undefined,
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
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prev) => !prev);
  };

  const authSubmissionHandler = async (e) => {
    e.preventDefault();

    console.log(formState.inputs);

    if (isLoginMode) {
      try {
        const resData = await sendRequest(
          `http://localhost:5000/api/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        login(resData.user.id);
        history.replace({ pathname: "/" });
      } catch (e) {
        console.log(`Error: ${e.message}`);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        await sendRequest(
          `http://localhost:5000/api/users/signup`,
          "POST",
          formData,
          {
            "Content-Type": "application/json",
          }
        );

        login();
        history.replace({ pathname: "/" });
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="auth card-padding">
        {isLoading && <LoadingSpinner asOverlay />}
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
          {!isLoginMode && (
            <ImageUpload id="image" center onInput={inputHandler} />
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
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
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
    </React.Fragment>
  );
};

export default Auth;

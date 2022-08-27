import React, { Component, useState } from "react";
import UserPool from "./UserPool";
import { useNavigate } from "react-router-dom";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

export function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [showPassword, setShow] = useState(false);
    const navigate = useNavigate();

    const onSubmit = () => {
        var attributesList = [];

        const usRole = {
            Name: "custom:role",
            Value: "User",
        };

        const nickname = {
            Name: "custom:us_name",
            Value: name,
        };

        const phonenumber = {
            Name: "custom:phone_number",
            Value: "0917600202",
        };

        attributesList.push(new CognitoUserAttribute(usRole));
        attributesList.push(new CognitoUserAttribute(nickname));

        if (email.indexOf("@") !== -1 && password !== "" && name !== "") {
            UserPool.signUp(
                email,
                password,
                attributesList,
                null,
                (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                    }
                }
            );
            navigate("/finishedSignUp");
        }
    };

    return (
        <form className="w-full mx-auto loginBox max-w-[600px] p-5">
            <h1 className="mb-10 text-4xl font-bold text-center announcementLabel">
                {" "}
                Registration
            </h1>

            <div>
                <label class="formLabel" htmlFor="name">
                    Name
                </label>
                <input
                    style={{ color: "black" }}
                    value={name}
                    required
                    onChange={(e) => {
                        setName(e.target.value);
                    }}></input>
            </div>

            <div>
                <label class="formLabel" htmlFor="email">
                    Email
                </label>
                <input
                    style={{ color: "black" }}
                    value={email}
                    required
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}></input>
            </div>

            <div>
                <label class="formLabel" htmlFor="password">
                    Password
                </label>
                <input
                    style={{ color: "black" }}
                    value={password}
                    required
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}></input>
                <button
                    type="button"
                    className="view-img"
                    onClick={() => setShow(!showPassword)}>
                    <i
                        className={
                            showPassword
                                ? "bi bi-eye-fill"
                                : "bi bi-eye-slash-fill"
                        }></i>
                </button>
            </div>

            <button
                type="submit"
                class="signUpLink"
                onClick={() => onSubmit()}
                to={"/finishedSignUp"}>
                <span>Sign Up</span>
            </button>
        </form>
    );
}

const SignUpForAdmin = () => {
    return (
        <div>
            <SignUpForm />
        </div>
    );
};

export default SignUpForAdmin;

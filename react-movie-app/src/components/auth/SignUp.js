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
            Value: "Phuc0906",
        };

        const phonenumber = {
            Name: "custom:phone_number",
            Value: "0917600202",
        };

        attributesList.push(new CognitoUserAttribute(usRole));

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
        <form className="w-full mx-auto loginBox max-w-[600px] py-[100px]">
            <h1 className="mb-10 text-4xl font-bold text-center announcementLabel">
                {" "}
                Registration
            </h1>

            <div className="flex flex-col gap-2 max-w-[300px] justify-center mx-auto">
                <div className="flex items-center">
                    <label className="formLabel" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="ml-auto outline-none bg-slate-800"
                        value={name}
                        required
                        onChange={(e) => {
                            setName(e.target.value);
                        }}></input>
                </div>

                <div className="flex items-center">
                    <label className="formLabel" htmlFor="phoneNumber">
                        Phone Number
                    </label>
                    <input
                        className="ml-auto outline-none bg-slate-800"
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                        }}></input>
                </div>
                <div className="flex items-center">
                    <label className="formLabel" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="ml-auto outline-none bg-slate-800"
                        value={email}
                        required
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}></input>
                </div>
                <div className="flex items-center">
                    <label className="formLabel" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="ml-auto outline-none bg-slate-800"
                        value={password}
                        required
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}></input>
                </div>
            </div>

            <button
                type="submit"
                className="w-full p-3 signUpLink bg-primary max-w-[300px] mx-auto block mt-5 rounded-lg"
                onClick={() => onSubmit()}
                to={"/finishedSignUp"}>
                <span>Sign Up</span>
            </button>
        </form>
    );
}

const SignUp = () => {
    return (
        <div>
            <SignUpForm />
        </div>
    );
};

export default SignUp;

import React, { useState, useContext } from "react";
// import { AccountContext } from "../../contexts/AccountContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserPool from "./UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useAuth } from "../../contexts/AuthContext";

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { authicate } = useAuth();

    const onSubmit = (e) => {
        e.preventDefault();
        if (email.indexOf("@") !== -1 && password !== "") {
            authicate(email, password)
                .then((data) => {
                    navigate("/Home");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="w-full max-w-[600px] mx-auto">
            <h1 className="text-xl font-semibold"> Sign In</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label className="font" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="ml-auto outline-none bg-slate-800"
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}></input>
                </div>

                <div>
                    <label class="formLabel" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="outline-none bg-slate-800"
                        required
                        type={"password"}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}></input>
                </div>
                <button class="submitBtn" type="submit">
                    Sign In{" "}
                </button>
                <Link class="signUpLink" to={"/signUp"}>
                    <span>Sign Up </span>
                </Link>
            </form>
        </div>
    );
}

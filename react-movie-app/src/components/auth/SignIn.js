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
        <div className="pt-[100px]">
            <h1 className="mb-5 text-4xl font-semibold text-center"> Login</h1>
            <form onSubmit={onSubmit} className="w-full max-w-[600px] mx-auto">
                <div className="flex flex-col w-[250px] gap-2 mx-auto">
                    <div className="flex items-center">
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
                    <div className="flex items-center">
                        <label class="formLabel" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="ml-auto outline-none bg-slate-800"
                            required
                            type={"password"}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}></input>
                    </div>
                    <div className="flex items-center justify-center mt-5 gap-x-4 ">
                        <button
                            className="px-5 py-2 transition-all border border-white rounded-lg hover:text-primary hover:border-primary"
                            type="submit">
                            Sign In{" "}
                        </button>
                        <Link
                            className="px-5 py-2 transition-all border border-white rounded-lg hover:text-primary hover:border-primary"
                            to={"/signUp"}>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

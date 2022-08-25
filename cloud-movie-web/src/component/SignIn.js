import React, { useState, useContext} from "react";
import { AccountContext } from "./Account";
import {Link} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import UserPool from "./UserPool";
import { CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";

export function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {authicate} = useContext(AccountContext)

    const onSubmit = (e) => {
        e.preventDefault();
        if((email.indexOf("@") !== -1) && password !== "") {
            authicate(email, password).then(data => {
                navigate("/Home");
            }).catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <div> 
            <h1 class="announcementLabel"> Sign In</h1>
            <form onSubmit={onSubmit}>
            <div>
                <label class="formLabel" htmlFor="email">Email</label>
                <input required value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
            </div>
            
            <div>
                <label class="formLabel"  htmlFor="password">Password</label>
                <input required value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
            </div>
            <button class="submitBtn" type="submit">Sign In </button>
            <Link class="signUpLink" to={"/signUp"}><span>Sign Up </span></Link>
            </form>
        </div>
    )
}
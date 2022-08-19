import React, { useState, useContext} from "react";
import { AccountContext } from "./Account";
import UserPool from "./UserPool";
import { CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";

export function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {authicate} = useContext(AccountContext)

    const onSubmit = (e) => {
        e.preventDefault();

        authicate(email, password).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div> 
            <h1> Sign In Form</h1>
            <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
            </div>
            
            <div>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
            </div>

            <button type="submit"> Sign In</button>
            </form>
        </div>
    )
}
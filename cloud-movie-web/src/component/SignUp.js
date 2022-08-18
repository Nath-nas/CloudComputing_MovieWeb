import React, { useState } from "react";
import UserPool from "./UserPool";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

export function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        var attributesList = [];

        const usRole = {
            Name: "custom:role",
            Value: "Admin"
        }

        attributesList.push(new CognitoUserAttribute(usRole));

        console.log(email)
        UserPool.signUp(email, password, attributesList, null, (err, data) => {
            if (err) {
                console.log(err);

            }else {
                console.log(data);
            }
        })
    }

    return (
        <div class="loginBox"> 
            <h1> Registration</h1>
            <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
            </div>
            
            <div>
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
            </div>

            <button class="submitBtn" type="submit"> Sign Up</button>
            </form>
        </div>
    )
}


const SignUp = () => {
  return (
    <div>
      <SignUpForm/>
    </div>
  )
}

export default SignUp

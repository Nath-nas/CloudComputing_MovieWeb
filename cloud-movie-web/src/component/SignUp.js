import React, { useState } from "react";
import UserPool from "./UserPool";
import {Link} from "react-router-dom";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

export function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = () => {
        

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
            <h1 class="announcementLabel"> Registration</h1>
            
            <div>
                <label class="formLabel" htmlFor="email">Email</label>
                <input value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
            </div>
            
            <div>
                <label class="formLabel" htmlFor="password">Password</label>
                <input value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
            </div>

            <Link class="signUpLink" onClick={onSubmit} to={"/finishedSignUp"}><span>Sign Up </span></Link>
            
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

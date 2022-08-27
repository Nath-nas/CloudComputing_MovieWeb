import React from "react";
import  {SignIn}  from "./SignIn";
import { Status } from "./Status";

const LogIn = () => {
    return (
        <div class="loginBox">
            <Status />
            <br></br>
            <SignIn />
        </div>
    );
};

export default LogIn;

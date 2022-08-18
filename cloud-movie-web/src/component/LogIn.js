import React from 'react'
import {SignUp} from "./SignUp"
import {SignIn} from "./SignIn"
import {Account} from "./Account"
import {Status} from "./Status"
import '../style.css';

const LogIn = () => {
  return (
    <div class="loginBox">
      <Account>
      <Status/>
      <br></br>
      <SignIn/>
    </Account>
    </div>
  )
}

export default LogIn

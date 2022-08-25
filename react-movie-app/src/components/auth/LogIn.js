import React from 'react'
import {SignIn} from "./SignIn"
import {Account} from "./Account"
import {Status} from "./Status"

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

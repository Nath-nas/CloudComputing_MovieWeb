import React from 'react'
import {Link} from "react-router-dom"
import {Account} from "./Account"
import {Status} from "./Status"

const FinishedSignUp = () => {
  return (
    <div class="annoucement">
      <h1 class="announcementLabel">Thank you for creating an account.</h1>
      <div></div>
      <h1 class="announcementLabel">Please check you email to finish signing up.</h1>
      <br></br>
      <Link class="signUpLink" to={"/"}><span>Home</span></Link>
    </div>
  )
}

export default FinishedSignUp

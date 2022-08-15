import React from "react";
import { MovieUpload } from "./component/MovieUpload";
import {SignUp} from "./component/SignUp"
import {SignIn} from "./component/SignIn"
import {Account} from "./component/Account"
import {Status} from "./component/Status"

function App() {
  return (
    <Account >
      <Status/>
      <SignUp/>
      <br></br>
      <SignIn/>
    </Account>
  );
}

export default App;

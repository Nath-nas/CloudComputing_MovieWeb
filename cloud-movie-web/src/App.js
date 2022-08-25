import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./component/Home";
import LogIn from "./component/LogIn";
import SignUp from "./component/SignUp";
import FinishedSignUp from "./component/finishedSignUp";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/finishedSignUp" element={<FinishedSignUp/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

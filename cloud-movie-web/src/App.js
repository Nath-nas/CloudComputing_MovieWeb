import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LogIn from "./component/LogIn";
import SignUp from "./component/SignUp";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LogIn/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

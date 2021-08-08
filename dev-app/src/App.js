import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./Login/Login";
import Register from "./Register/register";
import Land from "./Landing/Landing";
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/newuser" component={Register} />
          <Route exact path="/Landing" component={Land} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

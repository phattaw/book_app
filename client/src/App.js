import React from "react";
import Books from "./pages/Books";
import Nav from "./components/Nav";
import NoMatch from "./pages/NoMatch";
import Detail from "./pages/Detail";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Books} />
          <Route exact path="/Books" component={Books} />
          <Route exact path="/Books/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

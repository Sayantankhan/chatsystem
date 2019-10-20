import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import Login from './route/login';
import Chat from './route/chat';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/chat" component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;

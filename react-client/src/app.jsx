import React from "react";
import ReactDOM from "react-dom";
import SignUp from './components/signup.jsx'
import Login from './components/login.jsx'
import Home from './components/home.jsx'
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
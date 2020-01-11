import React from "react";
import SignUp from './components/authentification/signup.jsx';
import Login from './components/authentification/login.jsx';
import Home from './components/home.jsx';
import SearchList from './components/search/SearchList.jsx';
import Announce from "./components/announces/announce.jsx";
import Form from "./components/announces/addForm.jsx";
import { Route, Switch } from 'react-router-dom';
import MyAnnounces from './components/announces/myAnnounces.jsx'

const App = () => (
  <div>
    <Switch>
      <Route path='/signup' component={SignUp} />
      <Route path='/MyAnnounces' component={MyAnnounces} />
      <Route path='/result' component={SearchList} />
      <Route path='/login' component={Login} />
      <Route path='/add' component={Form} />
      <Route path='/:id' component={Announce} />
      <Route path='/' component={Home} />
    </Switch>
  </div>
)

export default App;
import React from 'react';
import Carte from './top-teachers/Carte.jsx';
import Search from './search/Search.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.test = localStorage.getItem('token')
    console.log(this.test)
  }
  render() {
    return (
      <div>
        <nav>
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
          <a href="/add">Add an announce</a>
        </nav>
        <Search />
        <Carte />
      </div>
    )
  }

}
export default Home;
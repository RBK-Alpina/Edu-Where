import React from 'react';
import Carte from './top-teachers/Carte.jsx';
import Search from './search/Search.jsx';
import NavBar from './nav.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.test = localStorage.getItem('token')
    console.log(this.test)
  }
  render() {
    return (
      <div>
        <NavBar />
        <Search />
        <Carte />
      </div>
    )
  }

}
export default Home;
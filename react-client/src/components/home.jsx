import React from 'react';
import Carte from './top-teachers/Carte.jsx';
import Search from './search/Search.jsx';
import NavBar from './nav.jsx';

const Home = () => (
  <div>
    <NavBar />
    <Search />
    <Carte />
  </div>
)
export default Home;
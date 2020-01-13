import React from 'react';

//this component represents our navbar and it's different parts
const NavBar = () => (
  <header className="bg-white w-100 ph3 hover-blackpv3 pv4-ns ph4-m ph5-l bb b--light-gray" style={{ overflow: 'visible', position: 'fixed', top: '0', width: '100%' }}>
    <nav className="tc">
      <div className="fl db dib-ns tc mb3 mb0-ns">
        <a href="/" title="EduWhere Logo" className="link dim b mr0 mr3-ns f3 ba bw2 b--lightBlue" style={{ color: 'light-blue', borderColor: 'light-blue', padding: '3px' }}>EdWe</a>
      </div>
      <div className='fr'>
        <a className="link dim gray tc f6 f5-ns db dib-ns mr0 mr3-ns mb3 mb0-ns" href="/MyAnnounces" title="MyAnnounces">My Announces</a>
        <a className="link dim gray tc f6 f5-ns db dib-ns mr0 mr3-ns mb3 mb0-ns" href="/add" title="Add an announce">Add an announce</a>
        <a className="link dim gray tc f6 f5-ns db dib-ns mr0 mr3-ns mb3 mb0-ns" href="/login" title="Login">Login</a>
        <a className="link dim gray tc f6 f5-ns db dib-ns mr0 mr3-ns mb3 mb0-ns" href="/signup" title="Sign Up">Sign Up</a>
      </div>
    </nav>
  </header>
)

export default NavBar;


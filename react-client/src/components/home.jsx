import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.test = localStorage.getItem('token')
    console.log(this.test)
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
        <a href="/login">Login</a>
        <a href="/signup">Sign Up</a>
      </div>
    )
  }

}
export default Home;
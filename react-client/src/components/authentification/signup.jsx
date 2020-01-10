import React from "react";
import $ from "jquery";
import NavBar from '../nav.jsx';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmedPassword: ""
    }
    this.saveValue = this.saveValue.bind(this)
    this.sendInfo = this.sendInfo.bind(this);
  }
  saveValue(e) {
    document.querySelector('.error').style.display = "none";
    this.setState({ [e.target.name]: e.target.value })
  }
  sendInfo(e) {
    e.preventDefault();
    if (this.state.firstName === "") {
      document.querySelector('.error').innerText = "You need to enter your first name";
      document.querySelector('.error').style.display = "block";
    } else if (this.state.lastName === "") {
      document.querySelector('.error').innerText = "You need to enter your last name";
      document.querySelector('.error').style.display = "block";
    } else if (!this.state.email.includes('@') || !this.state.email.includes('.') || this.state.email === "") {
      document.querySelector('.error').innerText = "The email is not valid";
      document.querySelector('.error').style.display = "block";
    } else if (this.state.password !== this.state.confirmedPassword || this.state.password === "") {
      document.querySelector('.error').innerText = "The password dosen't match";
      document.querySelector('.error').style.display = "block";
    } else {
      $.post('/auth/signup', this.state)
        .then(result => {
          if (!result.saved) {
            document.querySelector('.error').innerText = result.msg;
            document.querySelector('.error').style.display = "block";
          } else {
            localStorage.setItem('token', result.token)
            window.location.pathname = "/";
          }
        })
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <h1>Sign Up</h1>
        <from >
          <label>First Name</label>
          <input type="text" value={this.state.firstName} name="firstName" onChange={this.saveValue} />
          <br />
          <label>Last Name</label>
          <input type="text" value={this.state.lastName} name="lastName" onChange={this.saveValue} />
          <br />
          <label>Email</label>
          <input type="text" name="email" value={this.state.email} onChange={this.saveValue} />
          <br />
          <label>Password</label>
          <input type="password" name="password" value={this.state.password} onChange={this.saveValue} />
          <br />
          <label>Password</label>
          <input type="password" name="confirmedPassword" value={this.state.confirmedPassword} onChange={this.saveValue} />
          <br />
          <input type="submit" onClick={this.sendInfo} value="Sign Up" />
          <br />
          <a href="/login">Login</a>
        </from>
        <h1 className="error" style={{ display: "none" }}></h1>
      </div>
    );
  }
}

export default SignUp;

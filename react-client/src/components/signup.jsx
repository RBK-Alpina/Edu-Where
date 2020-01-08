import React from "react";
import $ from "jquery";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
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
    if (this.username === "") {
      document.querySelector('.error').innerText = "You need to enter a username";
      document.querySelector('.error').style.display = "block";
    } else if (this.state.password !== this.state.confirmedPassword) {
      document.querySelector('.error').innerText = "The password dosen't match";
      document.querySelector('.error').style.display = "block";
    } else if (!this.state.email.includes('@') || !this.state.email.includes('.')) {
      console.log('wrong email')
      document.querySelector('.error').innerText = "The email is not valid";
      document.querySelector('.error').style.display = "block";
    } else {
      $.post('/auth/signup', this.state)
        .then(result => console.log({ result }))
    }
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <from >
          <input type="text" value={this.state.username} name="username" onChange={this.saveValue} />
          <br />
          <input type="text" name="email" value={this.state.email} onChange={this.saveValue} />
          <br />
          <input type="password" name="password" value={this.state.password} onChange={this.saveValue} />
          <br />
          <input type="password" name="confirmedPassword" value={this.state.confirmedPassword} onChange={this.saveValue} />
          <br />
          <input type="submit" onClick={this.sendInfo} />
          <br />
          <a href="/login">Login</a>
        </from>
        <h1 className="error" style={{ display: "none" }}></h1>
      </div>
    );
  }
}

export default SignUp;

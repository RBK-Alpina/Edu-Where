import React from "react";

class Login extends React.Component {
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
    console.log(this.state)
    if (this.state.password !== this.state.confirmedPassword) {
      document.querySelector('.error').style.display = "block";
    }
    e.preventDefault();

  }
  render() {
    return (
      <div>
        <h1>Login</h1>
        <from >
          <input type="text" name="email" value={this.state.email} onChange={this.saveValue} />
          <br />
          <input type="password" name="password" value={this.state.password} onChange={this.saveValue} />
          <br />
          <input type="submit" onClick={this.sendInfo} />
          <br />
          <a href="/signup">Sign Up</a>
        </from>
      </div>
    );
  }
}

export default Login;

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
      document.querySelector('.error').style.display = "inline";
    } else if (this.state.lastName === "") {
      document.querySelector('.error').innerText = "You need to enter your last name";
      document.querySelector('.error').style.display = "inline";
    } else if (!this.state.email.includes('@') || !this.state.email.includes('.') || this.state.email === "") {
      document.querySelector('.error').innerText = "The email is not valid";
      document.querySelector('.error').style.display = "inline";
    } else if (this.state.password !== this.state.confirmedPassword || this.state.password === "") {
      document.querySelector('.error').innerText = "The password dosen't match";
      document.querySelector('.error').style.display = "inline";
    } else {
      $.post('/auth/signup', this.state)
        .then(result => {
          if (!result.saved) {
            document.querySelector('.error').innerText = result.msg;
            document.querySelector('.error').style.display = "inline";
          } else {
            alert(result.token)
            localStorage.setItem('token', result.token)
            window.location.pathname = "/";
          }
        })
    }
  }

  render() {
    return (
      <div >
        <NavBar />

        <div className=" cover bg-center w-100 vh-100 dt" style={{
          backgroundImage: `url(https://i.ibb.co/55dn7rm/students-background.jpg)`,
          position: 'fixed', top: '20%', right: '50%', transform: 'translate(50%, -7.5%)'
        }}>
        </div>

        <main className="pa4 white" style={{ position: 'absolute', top: '25%', right: '50%', transform: 'translate(50%, -7.5%)' }}>
          <div className='ba bw1 b--white pa4 vh-60 br3' style={{ backgroundColor: 'rgba(0,0,0, 0.1)' }}>
            <form className="measure center">
              <fieldset
                id="sign_up"
                className="ba b--transparent ph0 mh0"
              >
                <legend className="f4 fw6 ph0 mh0">
                  SignUp
          </legend>
                <div className="mt3">
                  <label
                    className="db fw6 lh-copy f6"
                    for="email-address"
                  >
                    First Name*
          </label>
                  <input
                    className="pa2 input-reset ba white bg-transparent hover-bg-white hover-black w-100 br3"
                    type="email"
                    id="email-address"
                    value={this.state.firstName}
                    name="firstName"
                    onChange={this.saveValue}
                  />
                </div>
                <div className="mt3">
                  <label
                    className="db fw6 lh-copy f6"
                    for="email-address"
                  >
                    Last Name*
          </label>
                  <input
                    className="pa2 input-reset ba white bg-transparent hover-bg-white hover-black w-100 br3"
                    type="email"
                    id="email-address"
                    value={this.state.lastName}
                    name="lastName"
                    onChange={this.saveValue}
                  />
                </div>
                <div className="mt3">
                  <label
                    className="db fw6 lh-copy f6"
                    for="email-address"
                  >
                    Email*
            </label>
                  <input
                    className="pa2 input-reset ba white bg-transparent hover-bg-white hover-black w-100 br3"
                    type="email"
                    name="email"
                    id="email-address"
                    placeholder="example@example.com"
                    value={this.state.email}
                    onChange={this.saveValue}
                  />
                </div>
                <div className="mv3">
                  <label
                    className="db fw6 lh-copy f6"
                    for="password"
                  >
                    Password*
          </label>
                  <input
                    className="b pa2 input-reset ba white bg-transparent hover-bg-white hover-black w-100 br3"
                    type="password"
                    name="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.saveValue}
                  />
                </div>
                <div className="mv3">
                  <label
                    className="db fw6 lh-copy f6"
                    for="password"
                  >
                    Confirm Password*
          </label>
                  <input
                    className="b pa2 input-reset ba white bg-transparent hover-bg-white hover-black w-100 br3"
                    type="password"
                    name="confirmedPassword"
                    id="confirmedPassword"
                    value={this.state.confirmedPassword}
                    onChange={this.saveValue}
                  />
                </div>
              </fieldset>
              <div className="dtc v-mid">
                <input
                  className="dib v-mid b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white"
                  type="submit"
                  value="Signup"
                  onClick={this.sendInfo}
                />
                <h4 className="error tc red pa3" style={{ display: "none" }}></h4>
              </div>
              <div className="lh-copy mt3">
                <a
                  href="/login"
                  className="f6 link dim white db"
                >
                  Already have an account ? Login
                </a>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
  }
}

export default SignUp;

import React from "react";
import $ from "jquery";
import NavBar from '../nav.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    }
    this.saveValue = this.saveValue.bind(this)
    this.sendInfo = this.sendInfo.bind(this);
  }
  saveValue(e) {
    document.querySelector('.error').style.display = "none";
    this.setState({ [e.target.name]: e.target.value })
  }
  sendInfo(e) {
    $.post('/auth/login', this.state)
      .then(result => {
        if (!result.found) {
          document.querySelector('.error').innerText = result.msg;
          document.querySelector('.error').style.display = "inline";
        } else {
          localStorage.setItem('token', result.token);
          window.location.pathname = "/";
        }
      })
    e.preventDefault();

  }
  render() {
    return (

      <div >
        <NavBar />
        <div className="cover bg-center w-100 vh-100 dt" style={{
          backgroundImage: `url(https://i.ibb.co/55dn7rm/students-background.jpg)`,
          position: 'fixed', top: '20%', right: '50%', transform: 'translate(50%, -7.5%)'
        }} >

      <main className="pa4 white w-40" style={{ position: 'absolute', top: '25%', right: '50%', transform: 'translate(50%, -25%)', opacity: '1' }}>

        <div className='ba bw1 b--white pa4 vh-50 br3 shadow-1' style={{ backgroundColor: 'rgba(45,107,158, 0.8)' }}>
            <form className="measure center">
              <fieldset
                id="sign_up"
                className="ba b--transparent ph0 mh0 "
              >
                <legend className="f4 fw6 ph0 mh0">
                  Login
          </legend>
                <div className="mt3">
                  <label
                    className="db fw6 lh-copy f6"
                    for="email-address"
                  >
                    Email
          </label>
                  <input
                    className="pa2 input-reset ba white bg-transparent hover-bg-white hover-black w-100 br3"
                    type="email"
                    name="email"
                    id="email-address"
                    value={this.state.email}
                    onChange={this.saveValue}
                  />
                </div>
                <div className="mv3">
                  <label
                    className="db fw6 lh-copy f6"
                    for="password"
                  >
                    Password
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

              </fieldset>
              <div className="dtc v-mid">
                <input
                  className="br3 dib v-mid b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f5 dib white "
                  type="submit"
                  value="Login"
                  onClick={this.sendInfo}
                />
                <h4 className="error tc red pa3" style={{ display: "none" }}></h4>
              </div>
              <div className="lh-copy mt3" style={{ position: 'relative', top: '100%' }}>
                <a
                  href="/signup"
                  className="f6 link dim white db"
                >
                  Not a member yet ? Visit the Sign-up page
                </a>
              </div>
            </form>
          </div>
          </main>

        </div>
      </div>
    );
  }
}

export default Login;

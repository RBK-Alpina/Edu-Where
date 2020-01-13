import React from "react";
import $ from "jquery";
import NavBar from '../nav.jsx';
import { Redirect } from 'react-router-dom';

//this component is responsible for the form that allows the user to create a new announce
class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categorie: "", //  gets the value of the categorie input so it can be saved in the database
      region: "",           //  gets the value of the region input so it can be saved in the database
      phone: "",            //  gets the value of the phone input so it can be saved in the database
      description: "",      //  gets the value of the description input so it can be saved in the database
      price: ""             //  gets the value of the price input so it can be saved in the database
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.change = this.change.bind(this);
  }

  //each element of the state will get the value of the input
  change(e) {
    document.querySelector('.error').style.display = "none";
    this.setState({ [e.target.name]: e.target.value });
  };

  //Once the user submit all infos will be sent and stored in the database
  onSubmit(e) {
    e.preventDefault();
    let token = localStorage.getItem('token')
    if (this.validation()) {
      document.querySelector('.error').innerText = this.validation();
      document.querySelector('.error').style.display = "inline";
    } else {
      $.ajax({
        url: "/announces/add",
        method: "POST",
        data: this.state,
        headers: { token }
      })
        .done(res => this.setState({ done: true }))
        .fail(err => this.setState({ fail: true }))
    };
  }

  //In case the user want to post an announce without being connected . it will redirect him to another page where it tells him to login or sign up
  redirection() {
    return (
      <div>
        <h1>You need to be connected to post an announce</h1>
        <div>
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </div>
      </div>
    )
  }

  //impose on the user the fact that he must fill the inputs
  validation() {
    for (let key in this.state) {
      if (this.state[key] === "" && key !== "description") return `${key} is required`
    }
    return false
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
        <main className="pa4 white w-40" style={{ position: 'absolute', top: '25%', right: '50%', transform: 'translate(50%, -7.5%)' }}>
          <div className='ba bw1 b--white pa4 vh-60 br3' style={{ backgroundColor: 'rgba(45,107,158, 0.8)' }}>
            <form className="measure center">
              <fieldset
                id="sign_up"
                className="ba b--transparent ph0 mh0"
              >
                <legend className="f2 center fw6 ph0 mh0">
                  Add a new announce
          </legend>
                <div className="mt3">
                  <label
                    className="db fw6 lh-copy f3"
                  >
                    Region
                  </label>
                  <input
                    className="pa2 input-reset ba white bg-transparent hover-bg-white hover-black w-100 br3"
                    name="region"
                    placeholder="region"
                    value={this.state.region}
                    onChange={this.change}
                  />
                </div>
                <div className="mt3">
                  <label
                    className="db fw6 lh-copy f3"
                    for="email-address"
                  >
                    Categorie
                  </label>
                  <input
                    className="pa2 input-reset ba white bg-transparent hover-bg-white hover-black w-100 br3"
                    name="categorie"
                    placeholder="categorie"
                    value={this.state.categorie}
                    onChange={this.change}
                  />
                </div>
                <div className="mt3">
                  <label
                    className="db fw6 lh-copy f3"
                  >
                    Phone Number
                  </label>
                  <input
                    className="pa2 input-reset ba white bg-transparent hover-bg-white hover-black w-100 br3"
                    name="phone"
                    type="phone"
                    placeholder="Enter your phoneNumber"
                    value={this.state.phone}
                    onChange={this.change}
                  />
                </div>
                <div className="mv3">
                  <label
                    className="db fw6 lh-copy f3"
                  >
                    Price
                  </label>
                  <input
                    className="b pa2 input-reset ba white bg-transparent hover-bg-white hover-black w-100 br3"
                    name="price"
                    type="number"
                    placeholder="Enter your price"
                    value={this.state.price}
                    onChange={this.change}
                  />
                </div>
                <div className="mv3">
                  <label
                    className="db fw6 lh-copy f3"
                  >
                    Description
                  </label>
                  <input
                    className="b pa2 input-reset ba white bg-transparent hover-bg-white hover-black w-100 br3"
                    name="description"
                    placeholder="Enter your description"
                    value={this.state.description}
                    onChange={this.change}
                  />
                </div>
              </fieldset>
              <div className="dtc v-mid">
                <input
                  className="br3 dib v-mid b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white "
                  type="submit"
                  value="Submit"
                  onClick={this.onSubmit}
                />
                <h4 className="error tc orange ph5" style={{ display: "none" }}></h4>
              </div>
            </form>
            {this.state.done && <Redirect to="/" />}
            {this.state.fail && this.redirection()}
          </div>
        </main>
      </div>
    );
  }
}

export default Form;
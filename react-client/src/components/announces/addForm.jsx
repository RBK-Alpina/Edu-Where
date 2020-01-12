import React from "react";
import $ from "jquery";
import NavBar from '../nav.jsx';
import { Redirect } from 'react-router-dom';

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: ["", 'Math', 'Physics', 'It', 'Science', 'Philosophy', 'Geography'],
      categorie: "",
      region: "",
      phone: "",
      description: "",
      price: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.change = this.change.bind(this);
  }

  change(e) {
    document.querySelector('.error').style.display = "none";
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();
    let token = localStorage.getItem('token')
    if (this.validation()) {
      document.querySelector('.error').innerText = this.validation();
      document.querySelector('.error').style.display = "block";
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

        <main className="pa4 white" style={{ position: 'absolute', top: '25%', right: '50%', transform: 'translate(50%, -7.5%)' }}>
          <div className='ba bw1 b--white pa4 vh-60 br3' style={{ backgroundColor: 'rgba(0,0,0, 0.1)' }}>
            <form className="measure center">
              <fieldset
                id="sign_up"
                className="ba b--transparent ph0 mh0"
              >
                <legend className="f4 fw6 ph0 mh0">
                  Add a new announce
          </legend>
                <div className="mt3">
                  <label
                    className="db fw6 lh-copy f6"
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
                    className="db fw6 lh-copy f6"
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
                    className="db fw6 lh-copy f6"
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
                    className="db fw6 lh-copy f6"
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
                    className="db fw6 lh-copy f6"
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
                  className="dib v-mid b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white"
                  type="submit"
                  value="Submit"
                  onClick={this.onSubmit}
                />
                <h4 className="error tc red pa3" style={{ display: "none" }}></h4>
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






{/*  <div>
        <NavBar />
        <input
          name="region"
          placeholder="region"
          value={this.state.region}
          onChange={this.change}
        />
        <br />
        <input
          name="categorie"
          placeholder="categorie"
          value={this.state.categorie}
          onChange={this.change}
        />
        <br />
        <input
          name="phone"
          type="phone"
          placeholder="Enter your phoneNumber"
          value={this.state.phone}
          onChange={this.change}
        />
        <br />
        <input
          name="price"
          type="number"
          placeholder="Enter your price"
          value={this.state.price}
          onChange={this.change}
        />
        <br />
        <textarea
          name="description"
          placeholder="Enter your description"
          value={this.state.description}
          onChange={this.change}
        >
        </textarea>

        <button onClick={this.onSubmit}>Submit</button>
        <h1 className="error" style={{ display: "none" }}></h1>
        {this.state.done && <Redirect to="/" />}
        {this.state.fail && this.redirection()}
      </div >*/}
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
      <div>
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
        ></textarea>
        <button onClick={this.onSubmit}>Submit</button>
        <h1 className="error" style={{ display: "none" }}></h1>
        {this.state.done && <Redirect to="/" />}
        {this.state.fail && this.redirection()}
      </div >
    );
  }
}

export default Form;
import React from "react";
import $ from "jquery";

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: "",
      lastName: "",
      categorie: "",
      region: "",
      phone: "",
      price: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.change = this.change.bind(this);
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit(e) {
    e.preventDefault();
    $.post('/announces/add', this.state)
      .then(res => console.log(res))
  };


  render() {
    return (
      <div>
        <form>
          <input
            name="firstName"
            placeholder="Enter your first name"
            value={this.state.firstName}
            onChange={this.change}
          />
          <br />
          <input
            name="lastName"
            placeholder="Enter your last name"
            value={this.state.lastName}
            onChange={this.change}
          />
          <br />
          <input
            name="categorie"
            placeholder="category"
            value={this.state.categorie}
            onChange={this.change}
          />
          <br />
          <input
            name="region"
            placeholder="region"
            value={this.state.region}
            onChange={this.change}
          />
          <br />
          <input
            name="phone"
            placeholder="Enter your phoneNumber"
            value={this.state.phone}
            onChange={this.change}
          />
          <br />
          <input
            name="price"
            placeholder="Enter your price"
            value={this.state.price}
            onChange={this.change}
          />
          <button onClick={this.onSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
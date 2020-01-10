import React from "react";
import $ from "jquery";

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
    let token = localStorage.getItem('token')
    $.ajax({
      url: "/announces/add",
      method: "POST",
      data: JSON.stringify(this.state),
      headers: { token }
    })
      .done(res => console.log("done", res))
      .fail(err => console.log(err.responseText))
  };
  validation() {

  }

  render() {
    return (
      <div>
        <form>
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
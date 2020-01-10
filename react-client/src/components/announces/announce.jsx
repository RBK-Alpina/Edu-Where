import React from "react";
import $ from "jquery";
import Rating from './Rating.jsx'
import NavBar from '../nav.jsx';

class Announce extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: {},
    }
  }

  componentWillMount() {
    let id = window.location.pathname.split('/')[1]
    $.get(`/announce/${id}`)
      .then(res => this.setState({ info: res }))
  }

  render() {
    return (
      <div>
        <NavBar />
        <h3>{this.state.info.firstName} {this.state.info.lastName}</h3>
        <h3>{this.state.info.categorie}</h3>
        <h3>{this.state.info.region}</h3>
        <h3>{this.state.info.description}</h3>
        <h3>{this.state.info.price} DT</h3>
        <Rating />
      </div>
    )
  }
}
export default Announce;
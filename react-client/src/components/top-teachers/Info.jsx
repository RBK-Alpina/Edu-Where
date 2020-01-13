import React from "react";
import $ from "jquery";
import { Redirect } from 'react-router-dom';

//this component allows us to render dynamically the data
class Info extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: this.props.data[0],      //this element will always contain one data depending on the counter
      counter: 1,       //this element will play the role of an index
      clicked: false,
      redirect: ""
    }
    this.sendID = this.sendID.bind(this);
  }

  //this function will help us to to change the data in the state in a dynamic way
  componentWillMount() {
    setInterval(() => {
      if (this.state.counter === 3) {
        this.setState({ counter: 0 })
      }
      this.setState({
        info: this.props.data[this.state.counter],
        counter: this.state.counter += 1
      })
    }, 9000)
  }

  sendID() {
    this.setState({ clicked: true })
  }

  //this functions redirects the user to a specefic announce
  RenderTheComponant() {
    return <Redirect to={`/${this.state.info._id}`} />
  }

  render() {
    const elem = Math.floor(this.state.info.rating);
    const stars = [];
    let count = 0;
    for (let i = 0; i < 5; i++) {
      if (count !== elem) {
        stars.push(<span key={i} className="fa fa-star checked" style={{ color: 'gold' }}></span>);
        count++;
      } else {
        stars.push(<span className="fa fa-star" style={{ color: 'lightGray' }}></span>)
      }
    }
    return (
      <div onClick={this.sendID} >
        <h3>{this.state.info.firstName} {this.state.info.lastName}</h3>
        <h3>{this.state.info.region}</h3>
        <h3>{this.state.info.email}</h3>
        <h3>{this.state.info.phone}</h3>
        {stars}
        {this.state.clicked && this.RenderTheComponant()}
      </div>
    )
  }
}
export default Info;
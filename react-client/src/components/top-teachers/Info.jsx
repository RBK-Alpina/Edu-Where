import React from "react";
import $ from "jquery";
import { Redirect } from 'react-router-dom';

class Info extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: this.props.data[0],
      counter: 1,
      clicked: false,
      redirect: ""
    }
    this.sendID = this.sendID.bind(this);
  }

  componentWillMount() {
    setInterval(() => {
      if (this.state.counter === 3) {
        this.setState({ counter: 0 })
      }
      this.setState({
        info: this.props.data[this.state.counter],
        counter: this.state.counter += 1
      })
    }, 5000)
  }

  sendID() {
    this.setState({ clicked: true })
  }
  RenderTheComponant() {
    return <Redirect to={`/${this.state.info._id}`} />
  }
  render() {
    return (
      <div onClick={this.sendID}>
        <h3>{this.state.info.firstName} {this.state.info.lastName}</h3>
        <h3>{this.state.info.region}</h3>
        <h3>{this.state.info.price} DT</h3>
        {this.state.clicked && this.RenderTheComponant()}
      </div>
    )
  }
}
export default Info;
import React from "react";
import { Redirect } from 'react-router-dom';

class Teacher extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  changeState(e) {
    this.setState({ clicked: true })
  }
  RenderTheComponant() {
    return <Redirect to={`/ad/${this.props.data._id}`} />
  }
  render() {
    return (
      <div>
        <div
          id={this.props.data._id}
          onClick={this.changeState.bind(this)}
          className="bg-light-blue dib br3 pa3 ma2 grow bw2 shadow-5 vh-30 mw5-m"
          style={{ width: "250px" }}
        >
          <h2>{this.props.data.firstName}</h2>
          <h3>{this.props.data.categorie}</h3>
          <h1>{this.props.data.price}DT/2 Hours </h1>
          <p>{this.props.data.description}</p>
        </div>
        {this.state.clicked && this.RenderTheComponant()}
      </div>
    );
  }
}


export default Teacher;

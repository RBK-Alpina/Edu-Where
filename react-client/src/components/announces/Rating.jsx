import React from 'react';
import $ from "jquery";
import { Rating } from 'semantic-ui-react'

// this component is responsible for rating teachers
class Ratings extends React.Component {
  constructor(props) {
    super(props)
    this.state = { rating: 0 } // setting the rating as 0 by default
    this.handleChange = this.handleChange.bind(this)
  }

  //it will update the rating for a certain teacher each time he gets a new feedback
  handleChange(e) {
    let rate = $(':active').prevObject[0].activeElement.attributes[1].value
    $.ajax({
      url: '/update/ratings',
      method: 'PATCH',
      data: {
        rating: rate,
        id: this.props.data._id
      }
    })
  }


  render() {
    return (
      <Rating icon='star' defaultRating={0} maxRating={5} onClick={this.handleChange} />
    )
  }
}
export default Ratings
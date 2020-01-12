import React from 'react';
import $ from "jquery";
import { Rating } from 'semantic-ui-react'


class Ratings extends React.Component {
  constructor(props) {
    super(props)
    this.state = { rating: 0 }
    this.handleChange = this.handleChange.bind(this)
  }

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
import React from 'react';
import $ from "jquery";


class Rating extends React.Component {
  constructor(props) {
    super(props)
    this.state = { rating: 0 }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    document.querySelectorAll('.circle').forEach(elm => {
      elm.style.backgroundColor = ''
    })
    let i = 1
    while (i <= parseInt(e.target.id)) {
      document.getElementById(`${i}`).style.backgroundColor = 'gold'
      i++
    }
    $.ajax({
      url: '/update/ratings',
      method: 'PATCH',
      data: {
        rating: e.target.innerText,
        id: this.props.data._id
      }
    })
    this.setState({ rating: e.target.innerText })
  }

  render() {
    return (
      <div style={{ diplay: 'grid' }}>
        <div id='1' className='circle' onClick={this.handleChange}>1</div>
        <div id='2' className='circle' onClick={this.handleChange}>2</div>
        <div id='3' className='circle' onClick={this.handleChange}>3</div>
        <div id='4' className='circle' onClick={this.handleChange}>4</div>
        <div id='5' className='circle' onClick={this.handleChange}>5</div>
      </div>
    )
  }
}
export default Rating
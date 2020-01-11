import React from "react";
import $ from "jquery";
import NavBar from '../nav.jsx';
import Announces from './announces.jsx'

class MyAnnounces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.deleteAnnounce = this.deleteAnnounce.bind(this)
  }
  componentDidMount() {
    const token = localStorage.getItem('token')
    $.ajax({
      url: '/announces/getAll',
      headers: { token }
    })
      .done(data => this.checkAndRenderData(data))
      .fail(err => this.setState({ fail: true }))
  }
  deleteAnnounce(e) {
    const token = localStorage.getItem('token')
    $.ajax({
      url: '/announces/delete',
      method: 'DELETE',
      data: {
        id: e.target.id
      },
      headers: { token }
    }).then(data => this.checkAndRenderData(data))
  }
  renderMsg() {
    return (
      <div>
        <h1>You need to be connected to look at your announces</h1>
        <div>
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </div>
      </div>
    )
  }
  checkAndRenderData(data) {
    if (data.length) return this.setState({ data })
  }
  render() {
    return (
      <div>
        <h1>My Announces</h1>
        {/* <NavBar /> */}
        {this.state.data.map(elm => (
          <div key={elm._id} >
            <Announces announce={elm} />
            <button id={elm._id} onClick={this.deleteAnnounce}> Delete</button>
          </div>
        ))}
        {this.state.fail && this.renderMsg()}
      </div>
    )
  }
}

export default MyAnnounces;
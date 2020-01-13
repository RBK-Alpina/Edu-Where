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
        <div className='tc' style={{ width: "40vw", margin: "auto", position: "absolute", top: "35%", right: "50%", transform: "translateX(50%)" }}>
          <div className="mw9 center ph3-ns">
            <div className="cf ph2-ns">
              <h1>You need to be connected to look at your announces</h1>
              <div className="fl w-100 w-50-ns pa2">
                <div className="pv4"><a href="/login">Already have an account ? Login</a></div>
              </div>
              <div className="fl w-100 w-50-ns pa2">
                <div className="pv4"> <a href="/signup"> Not a member yet ? Visit the Sign-up page</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  checkAndRenderData(data) {
    if (data.length) return this.setState({ data })
  }
  render() {
    return (

      <div className="list pl0 mt0 measure" >
        <NavBar />
        <div style={{ width: "60vw", margin: "auto", position: "absolute", top: "10%", right: "50%", transform: "translateX(50%)" }}>
          {this.state.data.map(elm => (
            <div key={elm._id} className="flex items-center lh-copy pa3 ph0-l bb b--black-10 mb5" >
              <div className='br b--black-50'>
                <img
                  className="w2 h2 w4-ns h4-ns br2"
                  src="https://image.flaticon.com/icons/png/512/147/147131.png"
                />
                <span className="f2 db black-70 pa2">
                  {elm.firstName} {elm.lastName}
                </span>
              </div>
              <div className=" pl3 center ph5 ">
                <span className="f1 db black-70 pa2">
                  {elm.categorie}
                </span>

                <span className='f4 db black-70 pa2'>
                  {elm.region}
                </span>
                <span className='f5 db black-70 pa2'>
                  {elm.description}
                </span>

              </div>
              <div className=" pl3 center ph5 ">
                <span className="f3 db black-70 pa2">
                  {elm.email}
                </span>

                <span className='f3 db black-70 pa2'>
                  {elm.phone}
                </span>
                <span className='f3 db black-70 pa2'>
                  Price : {elm.price} DT
            </span>
              </div>
              <div className="f1-ns grow dib no-underline" id={elm._id} onClick={this.deleteAnnounce}> <i id={elm._id} className="fa fa-trash"></i></div>
            </div>
          ))}
        </div>
        {this.state.fail && this.renderMsg()}
      </div>
    )
  }
}


export default MyAnnounces;
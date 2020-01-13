import React from "react";
import $ from "jquery";
import Ratings from './Rating.jsx'
import NavBar from '../nav.jsx';

//this component is responsible for updating the views for the announce
class Announce extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: {},// helps us retrieve multiple data from it about the announce such as firstName , lastName and price ...
    }
  }

  //it will update the number of views once upon click
  componentWillMount() {
    let id = window.location.pathname.split('/')[1]
    $.ajax({
      url: '/update/views',
      method: 'PATCH',
      data: { id }
    })
      .then(res => this.setState({ info: res }))
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
      <div>
        <NavBar />
        <div className="flex items-center lh-copy pa3 ph0-l bb b--black-10" style={{ position: "fixed", top: "20%", right: "50%", transform: "translate(50%,50%)", width: "60vw" }}>
          <div className='br b--black-50'>
            <img
              className="w2 h2 w4-ns h4-ns br2"
              src="https://image.flaticon.com/icons/png/512/147/147131.png"
            />
            <span className="f2 db black-70 pa2">
              {this.state.info.firstName} {this.state.info.lastName}
            </span>
          </div>
          <div className=" pl3 center ph5 ">
            <span className="f1 db black-70 pa2">
              {this.state.info.categorie}
            </span>

            <span className='f4 db black-70 pa2'>
              {this.state.info.region}
            </span>
            <span className='f5 db black-70 pa2'>
              {this.state.info.description}
            </span>
          </div>
          <div className=" pl3 center ph5 ">
            <span className="f3 db black-70 pa2">
              {this.state.info.email}
            </span>
            <span className='f3 db black-70 pa2'>
              {this.state.info.phone}
            </span>
            <span className='f3 db black-70 pa2'>
              Price : {this.state.info.price} DT
            </span>
          </div>
          <div className='pl3 center ph5'>
            <h3>Rated : {stars}</h3>
            <h3>Rate me <Ratings data={this.state.info} /></h3>
          </div>
        </div>
      </div>
    )
  }
}
export default Announce;





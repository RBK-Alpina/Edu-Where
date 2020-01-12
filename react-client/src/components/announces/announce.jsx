import React from "react";
import $ from "jquery";
import Ratings from './Rating.jsx'
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
    $.ajax({
      url: '/update/views',
      method: 'PATCH',
      data: { id }
    })
      .then(res => this.setState({ info: res }))
  }

  render() {
    return (
      <div>
        <NavBar />
        <main className="pa4 " style={{ position: 'absolute', top: '25%', right: '50%', transform: 'translate(50%, -7.5%)' }}>
          <article className="bg-white center mw5 ba b--black-10 mv4">
            <div className="pv2 ph3">
              <h3 className="f6 ttu tracked">
                {this.state.info.categorie}
              </h3>
              <h3>{this.state.info.firstName} {this.state.info.lastName}</h3>
              <small className='gray db pv2'>
                <h3>{this.state.info.region}</h3>
              </small>
            </div>
            <img
              src="http://ern-dubai.com/wp-content/uploads/2019/04/facebook-anonymous-app.jpg"
              className="w-100 db"
              alt="Closeup photo of a tabby cat yawning."
            />
            <div className="pa3">
              <h3 className='dim lh-title'>{this.state.info.description}</h3>
              <small className="gray db pv2">
                {this.state.info.price} DT
          <h3>{this.state.info.rating} Stars</h3>
              </small>
              <Ratings data={this.state.info} />
            </div>
          </article>
        </main>
      </div>
    )
  }
}
export default Announce;





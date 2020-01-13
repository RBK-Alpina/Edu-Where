import React from "react";
import Info from './Info.jsx'
import $ from "jquery";

//this component is the carte component that will contain the data recieved from the Info component and appear in  our home page under the featured teachers
class Carte extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {} // this element will be fild with data and will be passed to the Info component as props
    }
  }

  async componentWillMount() {
    const data = await this.getData();
    this.setState({ data })
  }

  //this asyncronous function allows us to fill the data in the state with the retrieved data from our database using shorthand ajax
  async getData() {
    const data = {
      math: [],
      physics: [],
      it: [],
      science: [],
      philosophy: [],
      geography: []
    }
    for (var key in data) {
      await $.get(`/categorie/${key}`)
        .then(result => data[key] = result)
    }
    return data
  }

  render() {
    return (
      <div style={{ height: '80vh' }}>
        <div className="f1 tc fw2  black-60 ma4">Featured Teachers</div>
        <hr className="measure-wide center" />
        <section className="cf pt4 pb2 center" style={{ width: '70vw' }}>
          {
            Object.keys(this.state.data).map((elm, i) => (
              <div key={i} >
                <div className="link w-75 center fl-ns w-third-ns pa3 pa4-ns">
                  <div className="br2 ba dark-gray tc b--black-10">
                    <div className="aspect-ratio aspect-ratio--16x9">
                      <a className="aspect-ratio--object db overflow-hidden" href="#">
                        <div className="aspect-ratio--object grow dim cover pa2">
                          <Info data={this.state.data[elm]} />
                        </div>
                      </a>
                    </div>
                    <div className="pv2 ph3-ns pb3-ns bg-black-05 text-center">
                      <div className="dt w-100 mt1-ns">
                        <div className="dtc">
                          <a className="link dim no-underline near-black hover-underline" href="#">
                            <h1 className="f5 f4-ns mv1 mv2-ns">{elm.toUpperCase()}</h1>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </section>
      </div>
    )
  }
}
export default Carte
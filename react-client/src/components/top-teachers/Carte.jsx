import React from "react";
import Info from './Info.jsx'
import $ from "jquery";


class Carte extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  async componentWillMount() {
    const data = await this.getData();
    this.setState({ data })
  }

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
      <div>
        <div className="f4 f3-m f2-l tc fw2  black-50 ma4">Featured Teachers</div>
        <hr className="measure-wide center" />
        <section className="cf pt4 pb2 mw8 center">
          {
            Object.keys(this.state.data).map((elm, i) => (
              <div key={i} >
                <div className="link w-75 center fl-ns w-third-ns pa3 pa4-ns">
                  <div className="br2 ba dark-gray tc b--black-10">
                    <div className="aspect-ratio aspect-ratio--16x9">
                      <a className="aspect-ratio--object db overflow-hidden" href="#">
                        <div className="aspect-ratio--object grow dim cover">
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
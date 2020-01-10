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
        {
          Object.keys(this.state.data).map((elm, i) => (
            <div key={i} className='bg-light-blue dib br3 pa3 ma2 grow bw2 shadow-5 vh-30 mw5-m' style={{ width: '250px' }} >
              <h1>{elm.toUpperCase()}</h1>
              <Info data={this.state.data[elm]} />
            </div>
          ))
        }
      </div>
    )
  }
}
export default Carte
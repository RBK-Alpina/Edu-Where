import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      teachers: ['Math', 'Physics', 'It', 'Science', 'Philosophy', 'Geography']
    };

    //Binding the helper function to this component
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  // Toggles a this.state.found to be true
  onSubmit(event) {
    event.preventDefault();
    window.query = this.state.searchInput
    this.setState({ found: true })
  }

  // If this.state.found is true, Redirects to the /result page (route)
  goToResult() {
    return <Redirect to="/result" />
  }

  // Graps the value in the serarch imput
  onChange(event) {
    this.setState({ searchInput: event.target.value })
  }

  render() {
    return (
      <div>
        <header>
          <div className="cover bg-center w-100 vh-75 dt" style={{ backgroundImage: `url(https://i.ibb.co/5nnH0w2/bg.jpg)` }}>
            <div className="dtc v-mid">
              <div className="tc ph3">
                <div className="f2 f1-l fw2 white-90 mb0 lh-title">EduWhere</div>
                <h1 className="fw1 f3 white-80 mt3 mb4">We help you get connected with our teachers</h1>
                <div id="form" className='tc'>
                  <div className='mainSearch'>
                    <input className="tc br3 f9 white ba b--white v-mid dib no-underline ph5 pv3 mb3 bg-transparent w-50 f5" type="search" name="search" value={this.state.searchInput} onChange={this.onChange} />
                  </div>
                  <a className="f9 br3 no-underline  dib v-mid white ba b--white ph3 pv2 mb3 hover-white" href="#" onClick={this.onSubmit} >Search by categories</a>
                  {this.state.found && this.goToResult()}
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
export default Search;












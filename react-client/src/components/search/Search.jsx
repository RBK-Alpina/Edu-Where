import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: 'Math',
      teachers: ['Math', 'Physics', 'It', 'Science', 'Philosophy', 'Geography']
    };

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    event.preventDefault();
    localStorage.setItem('query', this.state.searchInput)
    this.setState({ found: true })
  }
  goToResult() {
    return <Redirect to="/result" />
  }
  onChange(event) {
    this.setState({ searchInput: event.target.value })
  }

  render() {
    return (
      <div>
        <div className='mainSearch'>
          <form onSubmit={this.onSubmit}>
            <select id="region" onChange={this.onChange}>
              {
                this.state.teachers.map((elem, i) =>
                  <option value={elem} key={i}>{elem}</option>
                )
              }
            </select>
            <button type='submit' >Search</button>
          </form>
        </div>
        {this.state.found && this.goToResult()}
      </div>
    );
  }
}
export default Search;












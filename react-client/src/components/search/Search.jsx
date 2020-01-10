import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      teachers: ['Math', 'Physics', 'It', 'Science', 'Philosophy', 'Geography']
    };

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    event.preventDefault();
    window.query = this.state.searchInput
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
          <input type="search" name="search" value={this.state.searchInput} onChange={this.onChange} />
          <button type='submit' onClick={this.onSubmit}>Search</button>
        </div>
        {this.state.found && this.goToResult()}
      </div>
    );
  }
}
export default Search;












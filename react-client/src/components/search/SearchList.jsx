import React, { Component } from "react";
import Teacher from "./Teacher.jsx";
import $ from "jquery";
import NavBar from '../nav.jsx';

//returns a boolean output (if query matches name OR do nothing if no query)
function searchFilter(searchQuery) {
  return function (a) {
    return (
      a.region.toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery
    );
  };
}
class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
      categorie: "",
      fail: false,
      searchQuery: ""
    };

    //Binding helper functions to this component
    this.inputHandler = this.inputHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //On mount invokes getAnnouces() function
  async componentDidMount() {
    let categorie = window.query || 'no';
    await this.getAnnounces(categorie)
  }

  //Request-Handler, requests annouces by categories and populates teachers with the response
  getAnnounces(categorie) {
    $.get(`/announces/${categorie}`).then(res => {
      if (res.length) {
        return this.setState({ teachers: res });
      } else {
        this.setState({ fail: true })
      }
    });
  }

  //Grabs the annouces' value from the Request-Handler and resets categorie on submitting
  async onSubmit(event) {
    event.preventDefault();
    let categorie = this.state.categorie || 'no';
    await this.getAnnounces(categorie)
    this.setState({ categorie: '' })
  }

  //Handles the input values
  inputHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { teachers, searchQuery, categorie } = this.state;
    return (
      <div>
        <NavBar />
        <div className="cover bg-center w-100 vh-50 dt" style={{ backgroundImage: `url(https://i.ibb.co/3ssFkBX/OO0122373-Blue-abstract-background-design-copy-copy.jpg)` }}>
          <div className="dtc v-mid">
            <div className="tc ph3">
              <div id="form" className='tc' style={{ width: "50vw", margin: '0 auto' }}>
                <div className='ListSearch'>
                  <input className="tc br3 f9 black ba b--white  v-mid dib no-underline ph5 pv3 mb3 bg-white-80 w-100" type="text" name="searchQuery" onChange={this.inputHandler} value={searchQuery} placeholder="Search by region..." /><br />
                  <input className="tc br3 f9 black ba b--white  v-mid dib no-underline ph5 pv3 mb3 bg-white-80 w-100" type="tesxt" name="categorie" onChange={this.inputHandler} value={categorie} placeholder="Search by category..." />
                </div>
                <a className="f9 br3 no-underline  dib v-mid white ba b--white ph3 pv2 mb3 hover-white" href="#" onClick={this.onSubmit} >Search</a>
              </div>
            </div>
          </div>
        </div>
        <main className="pa4 white center" style={{ width: "80vw" }}>
          <section className="cf ph2-ns">
            {
              teachers.filter(searchFilter(searchQuery)).map((elm, i) => (
                <div key={i} className="fl w-third pa2 w-5 mw8 black tc">
                  <Teacher data={elm} />
                </div>
              ))
            }
          </section>
        </main>
      </div>
    );
  }
}
export default SearchList;

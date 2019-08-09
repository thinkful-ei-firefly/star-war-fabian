import React from 'react';
import config from '../../config';
import ContextApi from '../../context/ContextApi';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    console.log('Sear IIIIIIIn');
  }

  componentDidMount(){
    console.log('Sear Mounted');
  }

  componentDidUpdate() {
    console.log('Sear Update');
  }

  static contextType = ContextApi;

  state = {
    type: 'people',
    textSearch : '',
    searching: false,
    errorMsn: ''
  }

  changeTextSearch = (e) => {
    const textSearch = e.currentTarget.value;
    this.setState({textSearch: textSearch});
  }

  validateTextSearch = () => {
    if (this.state.textSearch.length === 0){
      return "Insert some text";
    }
  }

  submitSearch = (e) => {
    e.preventDefault();
    this.setState({searching: true, errorMsn: ''});
    this.fetchRequest();
  }

  fetchRequest = () => {
    fetch(`${config.SERVER_URL}${this.state.type}/?search=${this.state.textSearch}`)
    .then(res => res.ok? res.json(): Promise.reject('You got error'))
    .then(results => {
      this.setState({searching: false, errorMsn: ''});
      this.context.updateCharacters(results.results.map(result => {
        const {name, homeworld} = result
        return {name, homeworld};
      }))
    })
    .catch(error => {
      console.log(error);
      this.setState({searching: false, errorMsn: error});
    });
  }

  changeSelect = (e) => {
    const type = e.currentTarget.value;
    this.setState({type:type, searching: true, errorMsn: ''})
    this.fetchRequest();
  }

  render(){
    return <form onSubmit={this.submitSearch}>
    <fieldset>
      <label htmlFor="typeSelection">Choose Type:</label>
      <select id='typeSelection' onChange={this.changeSelect}>
        <option value='people'>People</option>
        <option value='planets'>Planets</option>
        <option value='starships'>Starships</option>
        <option value='vehicles'>Vehicles</option>
        <option value='species'>Species</option>
      </select>
    </fieldset>
    <fieldset>
      <label htmlFor="textSearch">Text to search:</label>
      <input type="text" id="textSearch" value={this.state.textSearch} hint="Hello" onChange={this.changeTextSearch} ></input>
      <span>{this.validateTextSearch()}</span>
    </fieldset>
    <button type="submit" disabled={this.validateTextSearch()} >Search</button>
    {this.state.searching && <div className="loading">Searching..</div> }
    <div className="error">{this.state.errorMsn}</div>
    </form>
  }
}

export default Search;

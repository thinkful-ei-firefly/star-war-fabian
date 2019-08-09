import React from 'react';
import './App.css';
import ContextApi from './context/ContextApi';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Result from './components/Result/Result';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('App IIIIIIIn');
  }

  componentDidMount(){
    console.log('App Mounted');
  }

  componentDidUpdate() {
    console.log('App Update');
  }

  state ={
    characters: []
  }

  updateCharacters = (characters) => {
    this.setState({characters:characters});
    console.log(characters);
  }

  render(){
    const values = {
      characters: this.state.characters,
      updateCharacters: this.updateCharacters
    };

    return (
      <ContextApi.Provider value={values}>
      <div className="App">
        <Header />
        <Search />
        <Result />
      </div>
      </ContextApi.Provider>
    );
  }
}

export default App;

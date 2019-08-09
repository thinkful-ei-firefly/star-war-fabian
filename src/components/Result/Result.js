import React from 'react';
import ContextApi from '../../context/ContextApi';

class Result extends React.Component{
  static contextType = ContextApi;
  render(){
    const characters =  this.context.characters.map(character =>
      <p key={character.name}>{character.name}</p>
    )
    return<div>
      {characters}
    </div>
  }
}

export default Result;

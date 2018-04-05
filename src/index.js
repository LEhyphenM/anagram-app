import React from 'react';
import ReactDOM from 'react-dom';
import AnagramContainer from './App';
import './App.scss';

// ReactDOM.render(
//   <Anagram />,
//   document.getElementById('container')
// );

//Anagram Examples
//Slip Knot || Top Links
//New Words || Wow Nerds
//Madam Curie || Radium Came

  // <AnagramContainer word={"New Words"} anagram={"Wow Nerds"} />, 

ReactDOM.render(
<AnagramContainer word={"New Words"} anagram={"Wow Nerds"} />, 
  document.getElementById('container')
);



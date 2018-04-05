import React from 'react';
import ReactDOM from 'react-dom';
import AnagramContainer from './App';
import './App.scss';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AnagramContainer/>, <Anagram/>, div);
});

import React from 'react';
import ReactDOM from 'react-dom';
// import {LoginButton, LogoutButton, Greeting} from './Child';

function List() {
  const numbers = [1, 2, 3, 4]
  return (
    numbers.map(arg => {
      return <div>{arg}</div>
    })
  )
}

ReactDOM.render(
  <List />,
  document.getElementById('root')
);
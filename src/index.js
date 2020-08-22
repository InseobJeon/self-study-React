import React from 'react';
import ReactDOM from 'react-dom';
// import {LoginButton, LogoutButton, Greeting} from './Child';


const numbers = [1, 2, 3, 4]
const listItems = numbers.map(arg => {return <div>{arg}</div>})


ReactDOM.render(
  <>{listItems}</>,
  document.getElementById('root')
);
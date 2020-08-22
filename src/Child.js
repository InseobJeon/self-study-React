import React from 'react';

function LoginButton(props) {
    return (
      <button onClick={props.onClick}>
        Login
      </button>
    );
}
  
  function LogoutButton(props) {
    return (
      <button onClick={props.onClick}>
        Logout
      </button>
    );
}

function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}
  
  function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
}

// 이렇게 {} 를 통해서 여러개의 function 을 내보낼 수도 있다. 
export {LoginButton, LogoutButton, Greeting, UserGreeting, GuestGreeting};
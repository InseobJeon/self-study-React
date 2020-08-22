import React from 'react';

// return event handler to child component
function Child(props) {
    return ( 
    <>
        <div>i got name {props.name}</div>
        <button onClick={props.handler}>Button</button>
    </>
    
    )
};


export default Child
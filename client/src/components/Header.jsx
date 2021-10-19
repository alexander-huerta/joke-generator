import React from 'react';

const Header = (props) => (
  <div>
    <h1> Dad Joke Generator </h1>
    <button onClick={props.getJoke}> Get Joke </button>
  </div>
)

export default Header;

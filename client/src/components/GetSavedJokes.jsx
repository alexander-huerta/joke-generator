import React from 'react';

const GetSavedJokes = (props) => (
  <div>
    <button onClick={props.getSavedJokes}> View Saved Jokes </button>
  </div>
)

export default GetSavedJokes;
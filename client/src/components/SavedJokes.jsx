import React from 'react';
import Joke from './Joke.jsx'

const SavedJokes = ({savedJokes}) => (
  <div>
    {/* {savedJokes.map((joke) => (
        <Joke Saved Joke
        joke={joke}
        key={joke._id}/>
    ) */}
    {savedJokes.map((joke) => (
        <Joke Saved Joke
        setup={joke.setup}
        punchline={joke.punchline}
        key={joke._id}/>
    )
)}
  </div>
);

// SavedJokes.propTypes = {
//   savedJokes: PropTypes.array.isRequired
// };


export default SavedJokes;
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Header from './components/Header.jsx';
import Joke from './components/Joke.jsx';
import SaveJoke from './components/SaveJoke.jsx';
import GetSavedJokes from './components/GetSavedJokes.jsx';
import SavedJokes from './components/SavedJokes.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      setup: '',
      punchline:'',
      savedJokes: [],
      joke: {},
      jokeDisplayed: false,
      jokeHasBeenSaved: false
    }
  }

    getJoke() {
      $.ajax({
        url: "/joke",
        type: 'GET',
        success: (response) =>  {
          this.setState({
            id: response.id,
            setup: response.setup,
            punchline: response.punchline,
            joke:response,
            jokeDisplayed: true,
            jokeHasBeenSaved: false
          });

          //saved entire res obj as joke
          // console.log(this.state.joke)
        },
        error: (err) => {
          console.log('ajax get failed', err)
        }
      });
    }

    saveJoke () {
      $.ajax({
        url: "/joke",
        type: 'POST',
        data: {
          id: this.state.id,
          setup: this.state.setup,
          punchline: this.state.punchline
        },
        success: (response) =>  {
          alert('Joke Saved!');
          this.setState({
            jokeHasBeenSaved: true
          });
        },
        error: (err) => {
          console.log('ajax get failed', err)
        }
      });
    }

    getSavedJokes() {
      $.ajax({
        url: "/myjokes",
        type: 'GET',
        success: (response) =>  {
          this.setState({
            savedJokes: response,
          });
          console.log('Saved Jokes:', this.state.savedJokes)
        },
        error: (err) => {
          console.log('ajax get failed', err)
        }
      });
    }

    render() {
      if (this.state.jokeDisplayed === false) {
        return (
          <div>
            <Header getJoke={this.getJoke.bind(this)}/>
          </div>
        )
      } else if (this.state.jokeHasBeenSaved === true) {
        return (
          <div>
            <Header getJoke={this.getJoke.bind(this)}/>
            <GetSavedJokes getSavedJokes={this.getSavedJokes.bind(this)}/>
            <SavedJokes savedJokes={this.state.savedJokes}/>
          </div>
        )
      } else if (this.state.jokeDisplayed === true){
        return (
          <div>
            <Header getJoke={this.getJoke.bind(this)}/>
            <Joke setup={this.state.setup}
                  punchline={this.state.punchline}/>
            <SaveJoke saveJoke={this.saveJoke.bind(this)}/>
          </div>
        )
      }
    }



}

ReactDOM.render(<App />, document.getElementById('app'));
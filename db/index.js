const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

let db = mongoose.connection;
db.once('open', () => {
  console.log('connected to mongodb!!!')
})
db.on('error', (err) => {
  console.log(`oops ${err}`)
})

const jokeSchema = new mongoose.Schema(
{ id: String,
  setup: String,
  punchline: String
});

const Joke = mongoose.model('Joke', jokeSchema);

let saveNewJoke = function(joke) {
  let newJoke = new Joke({
    id: joke.id,
    setup: joke.setup,
    punchline: joke.punchline
  })
  return newJoke.save().then(() => console.log('meow'));
}

let getSavedJokes = function() {
  return Joke.find({})
}

module.exports = {saveNewJoke, getSavedJokes};

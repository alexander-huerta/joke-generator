const express = require('express')
const axios = require('axios').default;
const $ = require( "jquery" );
// const stringify = require("flatted");
// const CircularJSON = require('circular-json');
const db = require('../db/index.js')

const app = express()
const port = 3002

app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/../client/dist'));

const options = {
  method: 'GET',
  url: 'https://dad-jokes.p.rapidapi.com/random/joke',
  headers: {
    'x-rapidapi-host': 'dad-jokes.p.rapidapi.com',
    'x-rapidapi-key': '14589b4151msh2b2b4b33a3f0958p1b65e4jsn6cb822597d0e'
  }
};


//"type": "programming",

//2nd account for API
// var options = {
//   method: 'GET',
//   url: 'https://dad-jokes.p.rapidapi.com/random/joke',
//   headers: {
//     'x-rapidapi-host': 'dad-jokes.p.rapidapi.com',
//     'x-rapidapi-key': 'a611a40f5bmsh6f43d6cb6463dddp1b5d03jsn0346e597257f'
//   }
// };

//ROUTES
app.post('/joke', (req, res) => {
  db.saveNewJoke(req.body)
    .then(() => {
      res.status(200).send('joke saved to db!')
    })
    .catch((err) => {
      console.log(`error saving to db ${err}`)
      res.status(400).send('unable to save to db')
    })
})


app.get('/joke', (req, res) => {
  // options.method = 'GET'
  return axios.get(options.url, {
    headers: options.headers
  })
    .then((response) => {
      const joke = response.data.body[0];
      //can also request .png from api
      res.status(200).send(joke);
    })
    .catch((error) => {
      console.log(error)
    })
})

app.get('/myjokes', (req, res) => {
   db.getSavedJokes()
    .then((savedJokes) => {
      console.log(savedJokes)
      res.status(200).send(savedJokes)
    })
    .catch((err) => {
      res.status(400).send('unable to save to database')
      console.log(err, 'error getting savedJokes')
    })
//pull jokes from db and display 10 of them
//can add next page button will show pull the next 10
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})


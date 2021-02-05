const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));


// Index Page
app.get('/', (req, res, next) => {
  const data = {
    title: "Home"
  }
res.render('index', data);
});


// Beers Button
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers().then(beers => {const data = {
        title: "Beers",
        beers: beers
      }
      res.render('beers', data);
    })
    .catch(error => {
      console.log(error);
    })
});




app.listen(3001, () => console.log("Server running at localhost:3001"));
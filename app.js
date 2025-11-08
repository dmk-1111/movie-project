const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Movie = require('./model/movie');

const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));
app.use('/bootstrap-icons', express.static(__dirname + '/node_modules/bootstrap-icons'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery'));

const dbURL = 'mongodb+srv://user_0002:user12345@dmkcluster.k60wxg4.mongodb.net/dmk-db?appName=DmkCluster';
mongoose.connect(dbURL)
  .then((result) => app.listen(3000, () => {
    console.log('Server running port 3000...');
  }))
  .catch((err) => console.log(err));

//Middleware & static file
app.use(express.urlencoded({extended: true})); //Allow for form submit
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/movie');
});

// Show all
app.get('/movie', (req, res) => {
  Movie.find().sort({ createdAt: -1})
    .then((result) => {
      res.render('index', {title:'Movie', movies: result});
    })
    .catch((err) => {
      console.log('Query error : ' + err);
    });
});

// Create List
app.post('/create-movie', (req, res) => {
  const movie = new Movie(req.body);
  movie.save()
    .then((result) => {
      res.redirect('/movie');
    })
    .catch((err) =>{
      console.log("Error insert data : " + err)
    });
});

app.get('/about', (req, res) => {
  res.render('about', {title: 'About'});
});

app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

app.get('/movie/:id', (req, res) => {
  Movie.findById(req.params.id)
    .then((result) => {
      console.log(result.title);
      res.render('update', {title:'Update', data: result});
    })
    .catch((err) => console.log('Error of find data : ' + err));
});

// Update Data
app.post('/movie/:id',(req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then((result) => {
      if(!result){
        console.log("Data Not Found!");
      }
      res.redirect('/movie');
      console.log(result);
    })
    .catch((err) => console.log('Error of update data :' + err));
});

// Delete Data
app.post('/del-movie', (req, res) => {
  const movieId = req.body.movieId; // make sure your form or AJAX sends this

  Movie.findByIdAndDelete(movieId)
    .then((result) => {
      if (!result) {
        console.log("Movie not found!");
        return res.status(404).send("Movie not found");
      }

      console.log("Deleted movie:", result);
      res.redirect('/movie'); // redirect after delete
    })
    .catch((err) => {
      console.error('Error deleting movie:', err);
      res.status(500).send('Error deleting movie');
    });
});

// Detail Data
app.get('/movie/detail/:id', (req, res) => {
  Movie.findById(req.params.id)
    .then((result) => {
      if(!result){
        console.log("Data Not Found!");
      }
      res.render('detail', {title:'Detail', data:result});
    })
    .catch((err) => console.log('Error finding data :' + err));
});

app.use((req, res) => {
  res.render('404',{title: '404 - Page'});
});
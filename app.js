const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Router = require('./routes/movieRoute');
const app = express();

//------------------- Include ejs file of view engine
app.set('view engine','ejs');

//------------------- Tracking
// app.use(morgan('dev'));

//------------------- Middleware & static file
app.use(express.static('public'));
app.use('/bootstrap-icons', express.static(__dirname + '/node_modules/bootstrap-icons'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery'));

//------------------- Mongodb connection
const dbURL = 'mongodb+srv://user_0002:user12345@dmkcluster.k60wxg4.mongodb.net/dmk-db?appName=DmkCluster';
mongoose.connect(dbURL)
  .then((result) => app.listen(3000, () => {
    console.log('Server running port 3000...');
  }))
  .catch((err) => console.log(err));
//------------------- End connection

app.get('/',(req, res) => res.redirect('/movie'));
app.get('/about', (req, res) => res.render('about', {title: 'About'}));

//------------------- Movie router
app.use('/movie',Router);

//------------------- Invalid path
app.use((req, res) => {
  res.render('404',{title: '404 - Page'});
});
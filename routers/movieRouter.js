const express = require('express');
const router = express.Router();
const Movie = require('../model/movie');
const multer = require('multer');

//Allow for form submit
router.use(express.urlencoded({extended: true}));

// Set location for store image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/imgs/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
const upload = multer({ storage });

// Show all
router.get('/', (req, res) => {
  Movie.find().sort({ createdAt: -1})
    .then((result) => {
      res.render('index', {title:'Movie', movies: result});
    })
    .catch((err) => {
      console.log('Query error : ' + err);
    });
});

// Create List
router.post('/create',upload.single('uploaded_file'),(req, res) => {
  const movie = new Movie({
    title: req.body.title,
    author: req.body.author,
    desc: req.body.desc,
    image: 'imgs/' + req.file.filename
  });
  movie.save()
    .then((result) => {
      res.redirect('/movie');
    })
    .catch((err) =>{
      console.log("Error insert data : " + err)
    });
});

router.get('/update/:id', (req, res) => {
  Movie.findById(req.params.id)
    .then((result) => {
      console.log(result.title);
      res.render('update', {title:'Update', data: result});
    })
    .catch((err) => console.log('Error of find data : ' + err));
});

// Update Data
router.post('/update/:id',(req, res) => {
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
router.post('/delete', (req, res) => {
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
router.get('/detail/:id', (req, res) => {
  Movie.findById(req.params.id)
    .then((result) => {
      if(!result){
        console.log("Data Not Found!");
      }
      res.render('detail', {title:'Detail', data:result});
    })
    .catch((err) => console.log('Error finding data :' + err));
});

module.exports = router;
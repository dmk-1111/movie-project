const Movie = require('../model/movie');
const multer = require('multer');

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

//====Display function
const movie_display = (req,res) =>{
    Movie.find().sort({ createdAt: -1})
        .then((result) => {
          res.render('index', {title:'Movie', movies: result});
        })
        .catch((err) => {
          res.status(500).send('Error query movie : ' + err)
        });
}

//====Create function
const movie_create = [
  upload.single('uploaded_file'),
  (req, res) => {
    const movie = new Movie({
      title: req.body.title,
      author: req.body.author,
      desc: req.body.desc,
      image: 'imgs/' + req.file.filename,
    });

    movie.save()
      .then(() => {
        res.redirect('/movie');
      })
      .catch((err) => {
        console.error('Error inserting movie:', err);
        res.status(500).send('Error inserting movie: ' + err);
      });
  }
];

//====Update function
const movie_view_update = (req,res) =>{
    Movie.findById(req.params.id)
        .then((result) => { 
          res.render('update', {title:'Update', data: result});
        })
        .catch((err) => res.status(500).send('Error updating movie : ' + err));
}

const movie_update = [
    upload.single('uploaded_file'),
    (req,res) =>{
        const body = {
            title: req.title,
            author: req.author,
            desc: req.desc,
            image: 'imgs/' + req.file.filename
        };
        Movie.findByIdAndUpdate(req.params.id, body, {new:true})
            .then((result) => {
                if(!result){
                    return res.status(404).send("Movie not found");
                }
                res.redirect('/movie');
                console.log(result);
            })
            .catch((err) => {
                res.status(500).send('Error updating movie : ' + err);
            });
    }
];

//====Delete function
const movie_delete = (req,res) => {
    const movieId = req.body.movieId; // make sure your form or AJAX sends this
    Movie.findByIdAndDelete(movieId)
        .then((result) => {
            if (!result) {
            return res.status(404).send("Movie not found");
            }

            console.log("Deleted movie:", result);
            res.redirect('/movie'); // redirect after delete
        })
        .catch((err) => {
            res.status(500).send('Error deleting movie');
        });
}

//====Detail function
const movie_detail = (req,res) => {
    Movie.findById(req.params.id)
        .then((result) => {
        if(!result){
            return res.status(404).send("Movie not found");
        }
        res.render('detail', {title:'Detail', data:result});
        })
        .catch((err) => {
        res.status(500).send('Error detail movie : ' + err);
        });
}

module.exports = {
    movie_display,
    movie_create,
    movie_view_update,
    movie_update,
    movie_delete,
    movie_detail
}
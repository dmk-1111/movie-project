const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

//Allow for form submit
router.use(express.urlencoded({extended: true}));

// Routes
router.get('/', movieController.movie_display);
router.post('/create',movieController.movie_create);
router.get('/update/:id', movieController.movie_view_update);
router.post('/update/:id', movieController.movie_update);
router.post('/delete', movieController.movie_delete);
router.get('/detail/:id', movieController.movie_detail);

module.exports = router;
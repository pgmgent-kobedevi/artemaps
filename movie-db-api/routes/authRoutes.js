const express = require('express');

const MovieController = require('../controllers/MovieController');
const ReviewController = require('../controllers/ReviewController');
const DirectorController = require('../controllers/DirectorController');
const { withRole } = require('../services/auth/auth.services');
const { roles } = require('../models/User');

const directorController = new DirectorController();
const movieController = new MovieController();
const reviewController = new ReviewController();
// const logController = new LogController();

const authRouter = express.Router();
const adminRouter = express.Router();

// directors
authRouter.get('/directors', directorController.getDirectors); // overview
authRouter.get('/directors/:id', directorController.getDirectorById); // detail
adminRouter.post('/directors', directorController.createDirector); // add
adminRouter.patch('/directors/:id', directorController.updateDirectorById); // update
adminRouter.delete('/directors/:id', directorController.deleteDirectorById); // delete

// Movies
authRouter.get('/movies', movieController.getMovies); // overview
authRouter.get('/movies/:id', movieController.getMovieById); // detail
adminRouter.post('/movies', movieController.createMovie); // add
adminRouter.patch('/movies/:id', movieController.updateMovieById); // update
adminRouter.delete('/movies/:id', movieController.deleteMovieById); // delete

// Reviews
authRouter.get('/movies/:id/reviews', reviewController.getReviewsByMovie);
authRouter.post('/movies/:id/reviews', reviewController.createReviewByMovie);
adminRouter.delete('/movies/:id/reviews/:reviewid', reviewController.deleteReviewById);

// likedMovies
// authRouter.get('/likedMovies', logController.getLogsByProject);
// authRouter.post('/likedMovies', logController.createLogByProject);

authRouter.use(withRole(roles.admin), adminRouter);

module.exports = authRouter;
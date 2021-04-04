const express = require('express');

const MovieController = require('../controllers/MovieController');
const ReviewController = require('../controllers/ReviewController');
// const ProjectController = require('../controllers/ProjectController');
const { withRole } = require('../services/auth/auth.services');
const { roles } = require('../models/User');

const movieController = new MovieController();
const reviewController = new ReviewController();
// const logController = new LogController();

const authRouter = express.Router();
const adminRouter = express.Router();

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

// // logs
// authRouter.get('/projects/:id/logs', logController.getLogsByProject);
// authRouter.post('/projects/:id/logs', logController.createLogByProject);

authRouter.use(withRole(roles.admin), adminRouter);

module.exports = authRouter;
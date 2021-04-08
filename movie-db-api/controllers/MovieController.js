const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { Movie } = require('../models/Movie');

class MovieController {
        
    getMovies = async(req, res, next) => {
        try {
            const movies = await Movie.find().lean().populate('director', ['firstName', 'lastName']).exec();
            res.status(200).json(movies);
        } catch (e) {
            next(e);
        }
    }

    getMovieById = async(req, res, next) => {
        try {
            const {id} = req.params;
            const movie = await Movie.findById(id).lean().populate('director', ['firstName', 'lastName']).exec();
            if(movie) {
                res.status(200).json(movie);
            } else {
                next(new NotFoundError());
            }
        } catch(e) {
            next(e);
        }
    }

    deleteMovieById = async(req,res,next) => {
        try {
            const {id} = req.params;
            const movie = await Movie.findById(id).exec();
            if(movie) {
                await movie.remove();
                res.status(200).json({message: "Movie removed"});
            } else {
                next(new NotFoundError());
            }
        } catch(e) {
            next(e);
        }
    }

    updateMovieById = async(req,res,next) => {
        try {
            const {id} = req.params;
            // find 
            const movie = await Movie.findById(id).exec();
            if(movie) {
                // update
                movie.overwrite(req.body);
                const result = await movie.save();
                res.status(200).json(result);
            } else {
                next(new NotFoundError());
            }
        } catch(e) {
            next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
        }
    }
    
    createMovie = async (req, res, next) => {
        try {
            const movie = new Movie(req.body);
            const result = await movie.save();
            res.status(200).json(result);
        } catch (e) {
            next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
        }
    }

}

module.exports = MovieController;
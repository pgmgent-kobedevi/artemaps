const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { Movie } = require('../models/Movie');
const path = require('path');
const reqPath = path.join(__dirname, '../../');


class MovieController {

    uploadImage = async(req, res, next) => {
        try {
            if(req.files.file) {
                const file = req.files.file;
                file.mv(`https://mobdev2-moviedbapp.herokuapp.com/public/uploads/${file.name}`, err => {
                // file.mv(`../public/${file.name}`, err => {
                    if(err) {
                        // return res.status(500).send(err);
                        console.log(err);
                    }
                    res.status(200);
                });
            }
        } catch (e) {
            next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
        }
    }
        
    getMovies = async(req, res, next) => {
        try {
            const movies = await Movie.find().lean().populate('director', ['firstName', 'lastName']).exec();
            res.status(200).json(movies);
        } catch (e) {
            next(e);
        }
    }

    getMoviesPaginated = async(req, res, next) => {
        try {
            const {page, perPage} = req.params;
            const pageAmount = await Movie.count().exec()
                .then((totalMovies) => {
                    return Math.ceil(totalMovies / perPage)
                });
            const movies = await Movie.find().lean().populate('director', ['firstName', 'lastName']).limit(parseInt(perPage)).skip(perPage * page).sort({
                title: 'desc'
            }).exec();
            res.status(200).json({pageAmount, movies});
        } catch (e) {
            next(e);
        }
    }

    getMoviesByFilter = async(req, res, next) => {
        const {query} = req.params;
        if(!query) {
            this.getMovies;
        } else {
            try {
                const movies = await Movie.find({title: {$regex: '.*' + query + '.*', $options: 'i'}}).lean().populate('director', ['firstName', 'lastName']).exec();
                res.status(200).json(movies);
            } catch (e) {
                next(e);
            }
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
                res.status(200).json({movie});
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
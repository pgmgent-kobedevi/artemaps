const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { LikedMovie } = require('../models/LikedMovie');

class LikedMovieController {
        
    getLikedMovies = async(req, res, next) => {
        try {
            const {user} = req;
            const movies = await LikedMovie
                .find({userId: user._id})
                .lean()
                .populate('movie')
                .exec();
            res.status(200).json(movies);
        } catch (e) {
            next(e);
        }
    }

    deleteLikedMovie = async(req,res,next) => {
        try {
            const {id} = req.params;
            const movie = await LikedMovie.findById(id).exec();
            if(movie) {
                await movie.remove();
                res.status(200).json({message: "Liked movie removed"});
            } else {
                next(new NotFoundError());
            }
        } catch(e) {
            next(e);
        }
    }

    deleteLikedMovieWithoutId = async(req,res,next) => {
        try {
            const {user}= req;
            const {movieId} = req.params;
            const movies = await LikedMovie.find({userId: user._id, movieId: movieId}).exec();
            if(movies) {
                movies.map( async(movie) => {
                    await movie.remove();
                })
                res.status(200).json({message: "Liked movie removed"});
            } else {
                next(new NotFoundError());
            }
        } catch(e) {
            next(e);
        }
    }
    
    createLikedMovie = async (req, res, next) => {
        try {
            const {user} = req;
            const likedMovie = new LikedMovie({
                ...req.body,
                userId: user._id,
            });
            const result = await likedMovie.save();
            res.status(200).json(result);
        } catch (e) {
            next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
        }
    }

}

module.exports = LikedMovieController;
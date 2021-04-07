const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { Director } = require('../models/Director');
const { Movie } = require('../models/Movie');

class DirectorController {
        
    getDirectors = async(req, res, next) => {
        try {
            const directors = await Director.find().exec();
            res.status(200).json(directors);
        } catch (e) {
            next(e);
        }
    }

    getDirectorById = async(req, res, next) => {
        try {
            const {id} = req.params;
            const director = await Director.findById(id).exec();
            if(director) {
                res.status(200).json(director);
            } else {
                next(new NotFoundError());
            }
        } catch(e) {
            next(e);
        }
    }

    deleteDirectorById = async(req,res,next) => {
        try {
            const {id} = req.params;
            const director = await Director.findById(id).exec();
            if(director) {
                // this way the pre('remove') from Movie triggers
                // works but not optimal
                await Movie.find({directorId: id}).exec()
                .then( async(res) => {
                    res.map( async(movie) => {
                        await movie.remove()
                    })
                }).then(async () => await director.remove())
                res.status(200).json({message: "Director removed"});
            } else {
                next(new NotFoundError());
            }
        } catch(e) {
            next(e);
        }
    }

    updateDirectorById = async(req,res,next) => {
        try {
            const {id} = req.params;
            // find 
            const director = await Director.findById(id).exec();
            if(director) {
                // update
                director.overwrite(req.body);
                const result = await director.save();
                res.status(200).json(result);
            } else {
                next(new NotFoundError());
            }
        } catch(e) {
            next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
        }
    }
    
    createDirector = async (req, res, next) => {
        try {
            const director = new Director(req.body);
            const c = await director.save();
            res.status(200).json(c);
        } catch (e) {
            next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
        }
    }

}

module.exports = DirectorController;
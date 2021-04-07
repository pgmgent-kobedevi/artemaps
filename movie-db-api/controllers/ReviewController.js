const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const { Review } = require('../models/Review');

class ReviewController {
        
    getReviewsByMovie = async(req, res, next) => {
        try {
            const {id} = req.params;
            const reviews = await Review
                .find({movieId: id})
                .lean()
                .populate('user', 'userName')
                .exec();
            res.status(200).json(reviews);
        } catch (e) {
            next(e);
        }
    }

    createReviewByMovie = async (req, res, next) => {
        try {
            const {id} = req.params;
            const {user} = req;

            const review = new Review({
                ...req.body,
                userId: user._id,
                movieId: id,
            });
            const c = await review.save();
            res.status(200).json(c);
        } catch (e) {
            next(e.name && e.name === "ValidationError" ? new ValidationError(e) : e);
        }
    }

    deleteReviewById = async(req,res,next) => {
        try {
            const {reviewid} = req.params;
            const review = await Review.findById(reviewid).exec();
            if(review) {
                await review.remove();
                res.status(200).json({message: "Review removed"});
            } else {
                next(new NotFoundError());
            }
        } catch(e) {
            next(e);
        }
    }
    
}

module.exports = ReviewController;
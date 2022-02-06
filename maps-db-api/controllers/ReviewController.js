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
    
    getReviewsPaginated = async(req, res, next) => {
        try {
            const {id, page, perPage} = req.params;
            const pageAmount = await Review.find({movieId: id}).count().exec()
                .then((totalReviews) => {
                    return Math.ceil(totalReviews / perPage)
                });
            const reviews = await Review.find({movieId: id}).lean().populate('user', 'userName').limit(parseInt(perPage)).skip(perPage * page).sort({
                createdAt: 'desc'
            }).exec();
            res.status(200).json({pageAmount, reviews});
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
                res.status(200).json(review);
            } else {
                next(new NotFoundError());
            }
        } catch(e) {
            next(e);
        }
    }
    
}

module.exports = ReviewController;
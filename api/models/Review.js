const mongoose = require('mongoose');
const { User } = require('./User');

const scores = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
}

// schema
const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        enum: [scores.one, scores.two, scores.three, scores.four, scores.five, scores.six, scores.seven, scores.eight, scores.nine, scores.ten],
        default: scores.five,
    },
    review: {
        type: String,
        required: false,
    },
    movieId: {
        type: 'ObjectId',
        required: true,
    },
    userId: {
        type: 'ObjectId',
        required: true,
    },
}, {
  timestamps: true,  
  toJSON: {
      virtuals: true,
  },
  toObject: {
      virtuals: true,
  }
}); 

reviewSchema.virtual('movie', {
    ref:'Movie',
    localField: 'movieId',
    foreignField: '_id',
    justOne: true,
});

reviewSchema.virtual('user', {
    ref:'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});

const Review = mongoose.model('Review', reviewSchema);

// model
module.exports = {
    Review, reviewSchema,
}
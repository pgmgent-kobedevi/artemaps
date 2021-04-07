const mongoose = require('mongoose');

// schema
const likedMovieSchema = new mongoose.Schema({
    userId: {
        type: 'ObjectId',
        required: true,
    },
    movieId: {
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

likedMovieSchema.virtual('user', {
    ref:'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});

likedMovieSchema.virtual('movie', {
    ref:'Movie',
    localField: 'movieId',
    foreignField: '_id',
    justOne: true,
});

const LikedMovie = mongoose.model('LikedMovie', likedMovieSchema);

// model
module.exports = {
    LikedMovie, likedMovieSchema,
}
const mongoose = require('mongoose');
const { Review } = require('./Review');

// schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    coverLink: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    director: {
        type: String,
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

// everytime a movie gets removed
movieSchema.pre('remove', function() {
    const movie = this;
    // remove projects where the project.movieId === movie._id
    return Review.remove({movieId: movie._id});
});

const Movie = mongoose.model('Movie', movieSchema);

// model
module.exports = {
    Movie, movieSchema,
}
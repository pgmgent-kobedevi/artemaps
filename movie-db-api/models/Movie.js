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
    directorId: {
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

movieSchema.virtual('director', {
    ref:'Director',
    localField: 'directorId',
    foreignField: '_id',
    justOne: true,
});

// everytime a movie gets removed
movieSchema.pre(['remove', 'deleteMany'] , function() {
    const movie = this;
    return Review.remove({movieId: movie._id});
});

const Movie = mongoose.model('Movie', movieSchema);

// model
module.exports = {
    Movie, movieSchema,
}
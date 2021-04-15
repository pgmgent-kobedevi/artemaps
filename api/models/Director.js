const mongoose = require('mongoose');
const {Movie, movieSchema} = require('./Movie');
const {Review} = require('./Review');

// schema
const directorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
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

directorSchema.virtual('name').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

const Director = mongoose.model('Director', directorSchema);

// model
module.exports = {
    Director, directorSchema,
}
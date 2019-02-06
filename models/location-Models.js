const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitedPlaceSchema = new Schema({
  touristId : String,
  location: String,
  lat: Number,
  lng: Number
});

const VisitedPlace = mongoose.model('visitedplace', visitedPlaceSchema);

module.exports = VisitedPlace;

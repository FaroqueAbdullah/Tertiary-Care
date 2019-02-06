const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId : String,
  username : String,
  googleId: String,
  thumbnail: String,

  category : String,

  name : String,
  dateOfBirth : String,
  Gender : String,
  docLocation : String,
  qualification : String,
  specialization : String,
  mailId : String,
  phoneNumber : String,
  experience : String,
  totalRating : Number,
  totalPerson : Number,
  description : String
});

const User = mongoose.model('user', userSchema);

module.exports = User;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorLocationSchema = new Schema({
    doctorId : String,
    location : String,
    time : String,
    day : String,
    fee : String
});

const DoctorLocation = mongoose.model('doctorlocation', doctorLocationSchema);

module.exports = DoctorLocation;

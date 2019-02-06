const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    doctorId : String,
    doctorName : String,
    patentName : String,
    patentImg : String,
    patentId : String,
    location : String,
    PhoneNumber : String,
    Problem : String
});

const Appoinment = mongoose.model('appoinment', appointmentSchema);

module.exports = Appoinment;

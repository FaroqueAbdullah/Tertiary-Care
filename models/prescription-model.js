const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescrptionSchema = new Schema({
    doctorId: String,
    doctorThumbnil: String,
    doctorName: String,
    patentID: String,
    medicineName: String,
    medicineTime: String
});

const Prescrption = mongoose.model('prescrption', prescrptionSchema);

module.exports = Prescrption;

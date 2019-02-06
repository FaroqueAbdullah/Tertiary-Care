const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    doctorId : String,
    patentId : String,
    patentThumbnil : String,
    patentName : String,
    comment : String
});

const Doctorcomments = mongoose.model('comment', commentSchema);

module.exports = Doctorcomments;

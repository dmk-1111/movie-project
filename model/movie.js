const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    desc:{
        type:String,
        required: true
    },
    image:{
        type: String,
        required: false
    }
},{timestamps: true});

module.exports = mongoose.model('Movie', movieSchema);
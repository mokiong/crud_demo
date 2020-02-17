const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const usersSchema = Schema({
    
    Email    : { type: String, required: true}

});

module.exports = mongoose.model('User', usersSchema);
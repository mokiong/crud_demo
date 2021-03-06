const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const employeeSchema = Schema({
    Fullname : { type: String, required: true},
    Email    : { type: String, required: true},
    Mobile   : { type: String, required: true},
    City     : { type: String, required: true}
});

module.exports = mongoose.model('Employee', employeeSchema);
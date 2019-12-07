const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/EmployeeDB', 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('succesfully connected to mongodb'))
    .catch(err => console.error(err));


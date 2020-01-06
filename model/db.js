const mongoose = require('mongoose');
const dbURI = process.env.CONN;

mongoose.connect(dbURI, 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('succesfully connected to mongodb'))
    .catch(err => console.error(err));


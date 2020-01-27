const mongoose  = require('mongoose');
const dbURI     = process.env.CONN;
const localURI  = process.env.LOCAL_URI


//database connection
mongoose.connect('mongodb://localhost:27017/emms', 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('succesfully connected to mongodb'))
    .catch(err => console.error(err));


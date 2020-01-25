const mongoose  = require('mongoose');
const dbURI     = process.env.CONN;
const localURI  = process.env.LOCAL_URI

//dependencies for creating backup
const fs        = require('fs');
const _         = require('lodash');
const exec      = require('child_process').exec;
const path      = require('path');

//database connection
mongoose.connect(localURI, 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('succesfully connected to mongodb'))
    .catch(err => console.error(err));


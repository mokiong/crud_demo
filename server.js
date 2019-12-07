const express = require('express');
const path    = require('path');
const exphb   = require('express-handlebars');

require('./model/db');

const PORT = 3000;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//routes
const employeeRoute = require('./routes/employee');
app.use('/employee', employeeRoute);



app.set('views', path.join(__dirname, '/view/')); // sets default view path
app.engine('hbs', exphb({ extname: 'hbs', 
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/view/layout'
}));
app.set('view engine', 'hbs');


app.listen(PORT, () => {
    console.log(`Listening to: ${PORT}`)
});

require("dotenv").config();

const express = require('express');
const expressLayout = require('express-ejs-layouts')
const app = express();
const PORT = 5000 || process.env.PORT;

// connect to database
const connectDB = require('./server/config/db');

connectDB();

// allows passing of data through forms
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static('public'));

// Templating Engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

app.use('/',require('./server/routes/main'))
app.use('/',require('./server/routes/admin'))


// Define an anonymous function that logs a message to the console
// when the app is listening on a specified port
// Use string interpolation to include the value of the PORT variable
// in the log message
app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`)
})
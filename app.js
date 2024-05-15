require("dotenv").config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override')
const app = express();
const PORT = 5000 || process.env.PORT;
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const {isActiveRoute} =  require('./server/helpers/routeHelpers');


// connect to database
const connectDB = require('./server/config/db');
const session = require("express-session");

connectDB();

// allows passing of data through forms
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride( '_method'));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store:MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
    // cookie: {maxage: new Date (Date.now() + (3600000))}
}

))

app.use(express.static('public'));

// Templating Engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

app.locals.isActiveRoute = isActiveRoute

app.use('/',require('./server/routes/main'))
app.use('/',require('./server/routes/admin'))


// Define an anonymous function that logs a message to the console
// when the app is listening on a specified port
// Use string interpolation to include the value of the PORT variable
// in the log message
app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`)
})
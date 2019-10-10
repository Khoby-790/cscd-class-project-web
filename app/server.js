import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import cors from 'cors';
import dotenv from 'dotenv';
//routes
import webjs from '../routes/web';

dotenv.config();

//init passport

//contants
const port = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
const dbOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}


//connect to database
mongose.connect(DB_URL,dbOptions)
.then(()=>console.log('Database Connected'))
.catch((err)=>console.log('Database failed to connect' + err)); 
require('./models/user'); 
require('./models/student');



require('./config/passport')(passport);

//init the express app
const app = express();

//set middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// set app to use flashes
app.use(flash());


//express sessions configuration
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
}));

//init the passport 
app.use(passport.initialize())
app.use(passport.session());

// set the view engine
app.engine('html', require('express-ejs-extend'));
app.set('views', path.join(__dirname, '../resources/views'));
app.set('view engine', 'html');

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.errors = req.flash('errors');
    res.locals.user = req.user;
    res.locals.data = req.session.data;
    next();
});

//static files
app.use(express.static(path.join(__dirname, '../public')));


// routes
app.use('/', webjs);


//listen for requests
app.listen(port, ()=>console.log(`Server running on port:${port}`));
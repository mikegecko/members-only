const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const db_connect = require('./utils/db');
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

//Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const signupRouter = require('./routes/signup');

const app = express();
db_connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Express middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//PassportJs
app.use(session({secret: process.env.SECRET, resave: false,  saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// })

module.exports = app;

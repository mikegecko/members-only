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
const User = require('./models/user');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
dotenv.config();

const PORT = process.env.PORT || 3000;

//Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');

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
//This function is called when a user is authenticated (passport.authenticate() is called)
passport.use( new LocalStrategy( async(username, password, done) => {
  try {
    const user = await User.findOne({username: username});
    if(!user){
      return done(null, false, {message: "Incorrect username"});
    } 
    // if(user.password !== password){
    //   return done(null, false, {message: "Incorrect password"});
    // } 
    const result = await bcrypt.compare(password, user.password);
    if(!result){
      return done(null, false, {message: "Incorrect password"});
    }
    return done(null, user);
  } catch (error) {
    return(done(error))
  }
}));
passport.serializeUser((user,done) => {
  done(null, user._id);
});
passport.deserializeUser( async(id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error)
  }
});
app.use(session({secret: process.env.SECRET, resave: false,  saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
})

//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

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

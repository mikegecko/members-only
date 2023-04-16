const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
  });
  
router.post('/', async (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    })
});

module.exports = router;
const express = require('express');
const User = require('../models/user');
const router = express.Router();

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('sign-up', { title: 'Signup' });
});

router.post('/', async (req, res, next) => {
    try{
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
        });
        const result = await newUser.save();
        res.redirect('/');
    } catch(error){
        return(next(error));
    }
});

module.exports = router;
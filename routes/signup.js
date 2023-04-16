const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('sign-up', { title: 'Signup' });
});

router.post('/', async (req, res, next) => {
    try{
        const saltRounds = 10;
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = new User({
            username: req.body.username,
            password: hash,
        });
        const result = await newUser.save();
        res.redirect('/');
    } catch(error){
        return(next(error));
    }
});

module.exports = router;
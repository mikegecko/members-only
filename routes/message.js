const express = require('express');
const router = express.Router();
const passport = require('passport');
const Message = require('../models/message');
const User = require('../models/user');

router.get('/', function(req, res, next) {
    res.render('message', { title: 'New Message', user: req.user });
  });

router.post('/', async function(req, res, next) {
    try {
        const newMessage = new Message({ 
            content: req.body.content,
            created_by: req.body.user,
            created_at: Date.now(),
        })
        const result = await newMessage.save();
        res.redirect('/');
    } catch (error) {
        return next(error);
    }
})

module.exports = router;
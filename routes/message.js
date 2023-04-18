const express = require('express');
const router = express.Router();
const passport = require('passport');
const Message = require('../models/message');
const User = require('../models/user');



router.post('/new', async function(req, res, next) {
    try {
        const newMessage = new Message({ 
            content: req.body.content,
            created_by: req.body.user,
            created_at: Date.now(),
        })
        

    } catch (error) {
        return next(error);
    }
})

module.exports = router;
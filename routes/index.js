const express = require('express');
const router = express.Router();
const Message = require('../models/message');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const messages = await Message.find({});
    res.render('index', { title: 'Home', user: req.user, messages: messages });
  } catch (error) {
    return next(error)
  }
});

module.exports = router;

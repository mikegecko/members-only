const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", function (req, res, next) {
  res.render("passcode", { title: "Passcode", user: req.user });
});

router.post("/", function (req, res, next) {
    if(req.body.passcode === process.env.PASSCODE){
        //Change user role to 'member'
        res.redirect("/");
    } else{
        res.redirect("/passcode");
    }
})

module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.get("/", function (req, res, next) {
  res.render("passcode", { title: "Passcode", user: req.user });
});

router.post("/", async function(req, res, next) {
    if(req.body.passcode === process.env.SUPERSECRET_PASSCODE){
        try {
            const user = await User.findByIdAndUpdate(req.user._id, {
                role: 'member',
                admin: true,
            });
            user.role = "member";
            user.admin = true;
        } catch (error) {
            return next(error);
        }
        res.redirect("/");
    }
    else if(req.body.passcode === process.env.PASSCODE){
        try {
            const user = await User.findByIdAndUpdate(req.user._id, {
                role: 'member',
            });
            user.role = "member";
        } catch (error) {
            return next(error);
        }
        res.redirect("/");
    } else{
        res.redirect("/passcode");
    }
})

module.exports = router;

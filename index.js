//Here is where all my middleware lives.

const Trail = require("../models/trail.js");
const Comment = require("../models/comment.js");

//Middlewares are stored in the Middleware Object

let middlewareObject = {};

middlewareObject.isLoggedIn = (req, res, next) => { //Check if logged in
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
};

middlewareObject.checkTrailOwnership = (req, res, next) => { //check if the trail's author id matches current users
    if (req.isAuthenticated()) { //first check if they are logged in at all.
        Trail.findById(req.params.id, (err, foundTrail) => {
            if (err) {
                res.redirect("back")
            } else {
                if (foundTrail.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        })
    } else {
        res.redirect("back")
    }
};

module.exports = middlewareObject;
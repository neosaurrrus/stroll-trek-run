//Here is where all my middleware lives.

const Trail   = require("../models/trail.js");
const Comment = require("../models/comment.js");

//Middlewares are stored in the Middleware Object

let middlewareObject = {};

middlewareObject.isLoggedIn = (req, res, next) => { //Check if logged in
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please login to do that");
    res.redirect("/login")
};

middlewareObject.checkTrailOwnership = (req, res, next) => { //check if the trail's author id matches current users
    if (req.isAuthenticated()) { //first check if they are logged in at all.
        Trail.findById(req.params.id, (err, foundTrail) => {
            if (err) {
                req.flash("error", "Wierd, I couldn't find that trail");
                res.redirect("back")
            } else {
                if (foundTrail.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Sorry, you do not have permission to do that");
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "Please login to do that");
        res.redirect("back")
    }
};

middlewareObject.checkCommentOwnership = (req, res, next) => { //check if the comment's author id matches current users
    if (req.isAuthenticated()) { //first check if they are logged in at all.
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                req.flash("error", "Wierd, I couldn't find that comment");
                res.redirect("back")
            } else {
                console.log(foundComment);
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Sorry, you do not have permission to do that");
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "Please login to do that");
        res.redirect("back")
    }
};
module.exports = middlewareObject;
const express = require("express"),
      router = express.Router({
        mergeParams: true
    }),
       Comment = require("../models/comment")
       mongoose = require("mongoose"),
       Trail = require("../models/trail"),
       middleware = require("../middleware") //uses index.js

//Edit Comment Route
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            console.log(err)
             req.flash("error", "Sorry I could not load the Edit form: " + err.message);
        } else {
            res.render("comments/edit", {
                comment: foundComment,
                trail_id: req.params.id
            })
        }
    })
})

//Update Comment Route
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment)=> {
        if (err){
             req.flash("error", "Sorry I could not update that comment: " + err.message);
            res.redirect("back");
        } else {
             req.flash("success", "Comment Updated");
            res.redirect("/trails/" + req.params.id);
        }
    })
})

//Destroy Comment Route
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
             req.flash("error", "Sorry I could not delete that comment: " + err.message);
            console.log(err)
        }
         req.flash("success", "That comment has been deleted!");
        res.redirect("/trails/" + req.params.id);
    })
})

//New Comment Route
router.get('/new', middleware.isLoggedIn, (req, res) => {
    Trail.findById(req.params.id, (err, foundTrail) => {
        if (err) {
             req.flash("error", "That's odd, I cant load the edit form: " + err.message);
            console.log(err)
        } else {
            res.render("comments/new", {
                trail: foundTrail
            })
        }
    })
})

//Post Comment Route
router.post('/', middleware.isLoggedIn, (req, res) => {
    Trail.findById(req.params.id, (err, trail) => {
        if (err) {
            console.log(err);
            req.flash("error", "Hmm that's odd: " + err.message);
            res.redirect("/trails")
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err)
                    req.flash("error", "Hmm that's odd: " + err.message);
                    res.redirect("/home")
                } else {
                    //add username, date and id to comment and then save comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    let dateOptions = {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    };
                    var today = new Date();
                    comment.date = today.toUTCString("en-US", dateOptions)
                    console.log(comment.date);
                    comment.save();
                    trail.comments.push(comment);
                    trail.save();
                    req.flash("success", "Comment Added");
                    res.redirect('/trails/' + trail._id);
                }
            })
        }
    })
})

module.exports = router;
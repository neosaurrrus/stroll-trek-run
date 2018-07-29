const express = require("express"),
    router = express.Router({
        mergeParams: true
    }),
    passport = require("passport");



router.get("/register", (req, res) => {
    res.render("register");
})

router.post('/register', (req, res) => {
    User.register(new User({
        username: req.body.username
    }), req.body.password, (err) => {
        if (err) {
            console.log(err);
            req.flash("error", "Sorry, we could not log you in: " + err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome " + req.body.username + ", hope you enjoy using the site!")
            res.redirect("/trails");
        });
    });
});




//Login Routes

router.get("/login", (req, res) => {
    res.render("login");
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/trails",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: "Welcome back to Stroll Trek Run."
}), (req, res) => {})

router.get("/logout", (req, res) => {
    req.flash("success", "You have been logged out")
    req.logout();
    res.redirect("/trails");
})


module.exports = router;
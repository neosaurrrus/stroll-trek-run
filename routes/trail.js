const express = require("express"),
      router = express.Router({mergeParams: true}),
      Trail = require("../models/trail"),
      middleware = require("../middleware") //uses index.js

//CREATE -  New trail POST route, delivers results of ADD route.
router.post('/',middleware.isLoggedIn, (req, res) => {
    //get data from form
    let newTrail = {
        name: req.body.name,
        tagline: req.body.tagline,
        image: req.body.image,
        timeToComplete: req.body.timeToComplete,
        difficulty: req.body.difficulty,
        description: req.body.description,
        toilets: req.body.toilets,
        parking: req.body.parking,
        water: req.body.water,
        refreshments: req.body.refreshments,
        dogs: req.body.dogs,
        wheelchair: req.body.wheelchair,
        author: {
            id:req.user._id,
            username: req.user.username
        }
    }
    //create new trail and save to database
    Trail.create(newTrail, (err) => {
        if (err) {
            req.flash("error", "Sorry I could not add that trail: " + err.message);
            console.log(err)
            res.redirect("trails");
        } else {
            req.flash("success", "Trail has been successfully added!");
            res.redirect("trails");
        }
    })
})

//NEW - Show New Trail form
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('trails/new');
})


//ROUTES that require Authorization
//Update Route
router.put('/:id', middleware.checkTrailOwnership, (req, res) => {
    Trail.findByIdAndUpdate(req.params.id, req.body.trail, (err) =>{
        if (err) {
            console.log(err);
            req.flash("error", "Sorry I could not edit that trail: " + err.message);
            res.redirect("/trails")
        } else {
            req.flash("success", "Trail has been successfully updated");
            res.redirect("/trails/" + req.params.id);
        }
    })
})

//Edit Route
router.get('/:id/edit', middleware.checkTrailOwnership, (req,res) => {
    Trail.findById(req.params.id, (err, foundTrail) => {
        if (err){
            res.redirect("back");
        }
        res.render("trails/edit", { trail: foundTrail})
    })
})


//DESTROY Route
router.delete("/:id", middleware.checkTrailOwnership, (req, res) => {
    Trail.findByIdAndRemove(req.params.id, (err, foundTrail) => {
        if (err) {
            res.redirect("/trails")
        } else {
            req.flash("success", foundTrail.name + " has been successfully deleted");
            res.redirect("/trails")
        }
    })
});


//SHOW - More details on the Trail. Make sure this is below NEW route, else it will bugger up the NEW Route.
router.get('/:id', (req, res) => {
    //find Trail with provided ID
    Trail.findById(req.params.id).populate("comments").exec((err, foundTrail) => {
        if (err) {
            console.log(err)
            res.redirect("/trails");
        } else {
            res.render("trails/show", {
                trail: foundTrail
            });
        }
    });
})

//INDEX
router.get('/', (req, res) => {
    Trail.find({}, (err, allTrails) => {
        if (err) {
            console.log(err);
            req.flash("error", "Well, this is wierd: " + err.name);

        } else {
            res.render('trails/index', {
                trails: allTrails,
            });
        }
    })
})

module.exports = router;

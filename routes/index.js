const express = require("express"),
      router = express.Router({mergeParams: true});



router.get('/', (req, res) => {
    res.render("home");
})

// router.get('*', (req, res) => {
//     res.send("No page here!");
// })


module.exports = router;
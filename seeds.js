const mongoose = require("mongoose"),
      Trail = require("./models/trail"),
      Comment = require("./models/comment");


//Our Seeded Trails
const data = [
    {
        name: "Mars to Phobos",
        image: "/images/ph1.jpg",
        description: "This is a suprisingly dull route"
    }, {
        name: "Amazon to the Artic",
        image: "/images/ph2.jpg",
        description: "It is hot and then it gets rather cold"
    }, {
        name: "Tesco to Sainsburies",
        image: "/images/ph3.jpg",
        description: "The two great rivals of our time encapsulated in one walk"
    }
]

function seedDB() {
//Remove all trails
    Trail.remove({}, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.info("All trails deleted")
//Add example trails
//             data.forEach(seed => {
//                 Trail.create(seed, (err, trail) => {
//                     if (err) {
//                         console.log(err)
//                     } else {
//                         console.log("Added " + seed.name)
// //Create a Comment  
//                         Comment.create(
//                             {
//                                 text: "This is a scary place",
//                                 author: "Scaredy Cat"
//                             }, (err, comment) => {
//                                 if (err) {
//                                     console.log(err);
//                                 } else {
//                                     trail.comments.push(comment);
//                                     trail.save()
//                                     console.log("Created a new comment")
//                                 }
//                             }
//                         )
//                     }
//                 })
//             })
        }
    })
}

module.exports = seedDB;
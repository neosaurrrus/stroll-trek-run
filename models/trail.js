const mongoose = require("mongoose");

//Set up Trail Schema
const trailSchema = new mongoose.Schema({ 
    name: String,
    tagline: String,
    image: String,
    timeToComplete: Number,
    difficulty: Number,
    description: String,
    toilets: {
        type: Boolean, 
        default:"false"
    },
    parking: {
      type: Boolean,
      default: "false"
    },
    water: {
          type: Boolean,
          default: "false"
    },
    refreshments: {
        type: Boolean,
        default: "false"
    },
    dogs: {
          type: Boolean,
          default: "false"
    },
    wheelchair: {
          type: Boolean,
          default: "false"
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
            
        }
    ]
});

//Set up Model from Schema

module.exports = mongoose.model('Trail', trailSchema); 

   
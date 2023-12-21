// import mongoose module
const mongoose = require("mongoose");

// create team schema
const teamSchema = mongoose.Schema({
    name: String,
    foundation: Number,
    stadium: String,
    owner: String,
    players: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
        }
        ]
        });
// create team model
const team= mongoose.model("Team",teamSchema);

// export team
module.exports= team;


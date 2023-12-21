const mongoose= require("mongoose");

stadiumSchema= mongoose.Schema({
    country : string,
    name: string,
    capacity: Number,
});

const stadium= mongoose.model("Stadium",stadiumSchema);

module.exports= stadium;

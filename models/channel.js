var mongoose = require("mongoose");

var channelSchema = new mongoose.Schema({
    name         : { type: String },
    description  : { type: String },
    created_by   : { type: String},
    users        : { type: Array },
    secret       : { type: String },
    current_video: { type: String },
    playlist     : { type: Array },
    locked       : { type: Boolean }
});

module.exports = mongoose.model("Channel", channelSchema);

var mongoose = require("mongoose");

var channelSchema = new mongoose.Schema({
    name         : { type: String },
    description  : { type: String },
    created_at   : { type: Date },
    last_active  : { type: Date },
    users        : { type: Array },
    secret       : { type: String },
    current_video: { type: String },
    playlist     : { type: Array },
});

module.exports = mongoose.model("Channel", channelSchema);

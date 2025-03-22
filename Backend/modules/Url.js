const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true
    },
    long: {
        type: String,
        required: true
    },
    UserId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    shortId: {
        type: String,
        required: true
    },
    QR: {
        type: String,
        required: true
    },
    CreatedOn: {
        type: Date,
        default: Date.now,
        required: true
    },
});

const Url = mongoose.model("urls", Schema);
module.exports = Url
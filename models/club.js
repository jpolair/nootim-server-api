const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const clubSchema = new Schema({
    clubName: { type: String, required: true },
    members: [ObjectId]
});

module.exports = mongoose.model('Club', clubSchema);
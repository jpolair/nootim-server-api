const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const clubSchema = new Schema({
    clubName: { type: String, required: true },
    members: [{ type: ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Club', clubSchema);
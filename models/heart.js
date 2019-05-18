const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const heartSchema = new Schema({
    messageId: { type: ObjectId, required: true },
    heartOwner: [{ type: ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Heart', heartSchema);
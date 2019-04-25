const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const commentSchema = new Schema({
    messageId: { type: ObjectId, required: true, ref: 'Message' },
    ownerMessage: { type: ObjectId, required: true, ref: 'User' },
    ownerComment: { type: ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Comment', commentSchema);
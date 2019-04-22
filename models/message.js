const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const messageSchema = new Schema({
    clubId: { type: ObjectId },
    owner: { type: ObjectId },
    content: { type: String },
    comments: [
        {
            owner: { type: ObjectId, required: true },
            content: { type: String, required: true },
            date: { type: Date, required: true }
        }
    ],
    media: {
        mediaType: { type: String, required: true },
        url: { type: String, required: true }
    }
});

module.exports = mongoose.model('Message', messageSchema);
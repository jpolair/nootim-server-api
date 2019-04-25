const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema({
    clubId: { type: ObjectId, ref: 'Club' },
    owner: { type: ObjectId, ref: 'User' },
    content: { type: String },
    media: {
        mediaType: { type: String, required: true },
        url: { type: String, required: true }
    }
});

module.exports = mongoose.model('Message', messageSchema);
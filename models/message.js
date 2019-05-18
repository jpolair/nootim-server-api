const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema({
    clubId: { type: ObjectId, ref: 'Club' },
    owner: { type: ObjectId, ref: 'User' },
    content: { type: String, required: true },
    hearts: [ { type: ObjectId, ref: 'User' } ],
    media: {
        mediaType: { type: String },
        url: { type: String }
    }
});

module.exports = mongoose.model('Message', messageSchema);
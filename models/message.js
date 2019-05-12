const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema({
    clubId: { type: ObjectId, ref: 'Club' },
    owner: { type: ObjectId, ref: 'User' },
    content: { type: String, required: true },
    media: {
        mediaType: { type: String },
        url: { type: String }
    }
});

// messageSchema.virtual('ownComments', {
//     ref: 'Comment', // The model to use
//     localField: 'comments', // Find people where `localField`
//     foreignField: 'messageId', // is equal to `foreignField`
//     // If `justOne` is true, 'members' will be a single doc as opposed to
//     // an array. `justOne` is false by default.
//     justOne: false,
//   });

module.exports = mongoose.model('Message', messageSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const eventSchema = new Schema({
    clubId: { type: ObjectId, ref: 'Club' },
    dateBegin: { type: Date },
    dateEnd: { type: Date },
    title: { type: String },
    description: { type: String }
});

module.exports = mongoose.model('Event', eventSchema);
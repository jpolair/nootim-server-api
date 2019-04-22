const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const paymentSchema = new Schema({
    clubId: { type: ObjectId, required: true },
    content: {
        motif: { type: String, required: true },
        amount: { type: Number, required: true },
        amountPaid: { type: Number, required: true },
        date: { type: Date, required: true }
    }
});

module.exports = mongoose.model('Payment', paymentSchema);
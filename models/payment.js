const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const paymentSchema = new Schema({
    clubId: { type: ObjectId, required: true, ref: 'Club' },
    content: {
        user: { type: ObjectId, ref: 'User' },
        motif: { type: String, required: true },
        amount: { type: Number, required: true },
        amountPaid: { type: Number, required: true },
        date: { type: Date, required: true }
    }
});

module.exports = mongoose.model('Payment', paymentSchema);
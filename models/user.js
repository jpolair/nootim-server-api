const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    isAdmin: { type: Boolean, default: false },
    isAdherent: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    avatar: { type: String, default: "" },
    lastname: { type: String, default: "" },
    firstname: { type: String, default: "" },
    birthdate: { type: Date, default: "" },
    address: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    results: [String | Number],
    level: [String | Number],
    clubId: [{ type: ObjectId, ref: 'Club' }]

});

module.exports = mongoose.model('User', userSchema);
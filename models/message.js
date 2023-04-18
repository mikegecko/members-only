const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    updated_at: { type: Date, default: Date.now },
}, {collection: 'messages'}); 


module.exports = mongoose.model('Message', MessageSchema);
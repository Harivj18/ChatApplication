const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    participants : [
        {
            type: String,
            required: true
        }
    ],
    messageId: [
        {
            type: String,
            ref: 'messages',
            default: []
        }
    ],
    roomId: {
        type: Number,
        required: true
    },
    chatType: {
        type: String,
        required: true
    }
})

const conversation = mongoose.model('conversation',conversationSchema);
module.exports = conversation;
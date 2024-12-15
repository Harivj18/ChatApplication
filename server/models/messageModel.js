const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: {
        type: Number,
        required: true
    },
    receiverId: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true,
        minLength: 1
    },
    roomId: {
        type: Number,
        required: true,
        minLength: 1,
    },
    chatType: {
        type: String,
        required: true,
    },
    sentOn: {
        type: String,
        required: true
    },
    attachment: {
        data: Buffer,
        type: String
    }
})

const messages = mongoose.model('messages', messageSchema);

module.exports =  messages;
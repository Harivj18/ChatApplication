const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    userName : {
        type: String,
        // ref: 'Users',
        required: true,
        unique: true
    },
    contactName : {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    roomId: {
        type: Number,
        required: true,
        unique: true
    },
    chatType: {
        type: String,
        required: true,
        enum: ['privateChat', 'groupChat']
    },
    profilePicture: {
        type: String
    }
})

module.exports = mongoose.model('contacts',contactSchema);
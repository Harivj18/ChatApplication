const conversation = require('../models/convoModel');
const messages = require('../models/messageModel');

const sentMessage = async (messageDetails) => {
    try {
        // const receiverId = req.params.id;
        // const senderId = req.user._id;
        console.log('req.body',messageDetails);
        
        const {message, senderId, receiverId, chatType, roomId, sentOn} = messageDetails;

        let checkConvo = await conversation.findOne({
            participants : {$all: [senderId, receiverId]}
        })

        console.log('checkconvo',checkConvo);
       
        if (!checkConvo || checkConvo === null) {
            checkConvo = await conversation.create({
                participants : [senderId, receiverId],
                roomId,
                chatType
            })
        }

        const messageInfo = new messages({
            senderId,
            receiverId,
            message,
            roomId,
            chatType,
            sentOn
        });
        console.log('messageInfo._id',messageInfo._id);
        
        if (messageInfo) {
            checkConvo.messageId.push(messageInfo._id)
            console.log('checkConvo2',checkConvo);
            
        }

        await Promise.all([messageInfo.save(), checkConvo.save()]);

        return Promise.resolve({'status': 'success', 'message': 'message sent'})
    } catch (error) {
        console.log('Error while sending message to the receiver',error);
        return Promise.resolve({'status': 500, 'message': 'Unable to send messages'})
    }
}

const getMessages = async (req, res) => {
    try {
       const {receiverId, senderId, roomId, chatType} = req.body;

        const chatHistory = await conversation.findOne({
            $and: [{
                participants: {$all: [senderId, receiverId]},
                roomId: roomId,
                chatType: chatType
            }]
        })
.populate('messageId');
        console.log('chatHistory', chatHistory);
        

        if (!chatHistory) {
            return res.json({'status': 'success', 'messages': []})
        }

        return res.json({'status': 'success', 'messages': [chatHistory]})
    
    } catch (error) {
        console.log('Error while getting message of the user',error);
        return res.json({'status': 500, 'message': 'Unable to Load messages'})
    }
}


module.exports = {sentMessage, getMessages}
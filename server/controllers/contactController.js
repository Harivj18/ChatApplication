const contacts = require('../models/contactModel');
const multer = require('multer');

const saveContact = async (req, res) => {
    try {
        const {
            userName,
            contactName,
            userId,
            roomId,
            chatType,
            profilePicture
        } = req.body;

        console.log('rom',roomId);
        // const storage = multer.memoryStorage();
        // const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }});
        // upload.single('image')
        // const newImage = new Image({
        //     name: profilePicture['name'],
        //     image: {
        //         data: req.file.buffer,
        //         contentType: profilePicture['type'],
        //     },
        // });
        // const imageBuffer = Buffer.from(profilePicture, 'base64').toString()
        // console.log('imageBuffer',imageBuffer);
        
        
        const isExistingContact = await contacts.findOne({'roomId': roomId});

        if (!isExistingContact) {
            const storeContact = await contacts.create({
                userName,
                contactName,
                userId,
                roomId,
                chatType,
                profilePicture
            });
            await storeContact.save();
            console.log('Save success');
            
            return res.json({
                'status': 'Success',
                "message": 'Contact Saved Successfully'
            })
        } else {
            return res.json({
                'status': 'Failed',
                'message': 'Contact Already Exists'
            })
        }
        console.log('sssssss', req.body)  
    } catch (error) {
        console.log('Error while Saving the Contact',error);
        throw error
    }
}

const getContacts = async (req, res) => {
    try {
        console.log('findcp');
        
        const contactList = await contacts.find();
        console.log('contactList',contactList);
//         if (contactList.length) {
//             for (let contacts of contactList) {
//                 if (contacts?.profilePicture && contacts['profilePicture'] !== null) {
//                     // console.log('contactsbefre',contacts['profilePicture']);
// console.log('hhhhhhhhhhhhhhhhhh',Buffer.isBuffer(contacts['profilePicture']));
//                     contacts['profilePicture'] = contacts['profilePicture'].toString('base64');
//                     // console.log('contactsafter',contacts['profilePicture']);

//                 }
//             }
//         }
        return res.json({
            "status" : 'SUCCESS',
            "contacts": contactList
        })
    } catch (error) {
        console.log('Error While Fetching List of Saved Contacts',error);
        throw error;
    }
}

module.exports = {saveContact, getContacts};
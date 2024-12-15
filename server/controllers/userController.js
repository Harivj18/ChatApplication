const users = require('../models/userModel');


const getUsers = async (req, res) => {
    try {
        const loggedUserId = req.user._id;

        const chatUsers = await users.find({_id: {$ne: loggedUserId._id}}).select('-password');

        return res.json({'status': 200, 'message': chatUsers})
    } catch (error) {
        console.log('Error while getting users',error);
        return res.json({'status': 500, 'message': 'Unable to Fetch Users'})
    }
}

module.exports = getUsers;
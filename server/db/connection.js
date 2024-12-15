const mongoose = require('mongoose');

const connectMongoose = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDb Server Connected Successfully');
    } catch (error) {
        console.log('Connection.js : connectMongoose => Error while connecting mongodb',error);
    }
}

module.exports = connectMongoose;
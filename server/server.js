const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookies = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const OAuth2Strategy = require('passport-google-oauth2');
const session = require('express-session');


// const mongoConnection = require('mongoose')
// const {mongoClient} = require('mongodb');
const connectMongoose = require('./db/connection');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes')
const contactRoutes = require('./routes/contactRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const socketConnection = require('./socket');
const googleLoginRoutes = require('./routes/googleLoginRoutes');
const githubLoginRoutes = require('./routes/githubLoginRoutes');

dotenv.config();
app.use(cookies());
app.use(session({
    secret: process.env.JWT_SECRET_KEY,
    resave:false,
    saveUninitialized:true
}))
app.use(passport.initialize());
app.use(passport.session());
const port = process.env.PORT || 8080;

app.use(bodyParser.json({ limit: '15mb' }));

app.use(cors({
    origin: ["http://localhost:3000","http://localhost:3001"],
    credentials: true
}));

app.use('/protectedRoutes',authRoutes)
app.use('/chatApp/auth',authRoutes)
app.use('/chatApp/contacts',contactRoutes)
app.use('/chatApp/message', messageRoutes);
app.use('/chatApp/convo',userRoutes);
app.use('/auth',googleLoginRoutes)
app.use('/github', githubLoginRoutes)

const server = app.listen(port, (err)=> {
    if (err) {
        console.log('Error while starting the Server',err);
    } else {
        console.log(`Server is Listening on Port ${port}`);
        connectMongoose();
        socketConnection(server)
    }
})


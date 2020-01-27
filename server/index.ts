import express from 'express'
import mongoose from 'mongoose'
import { sessionKeys } from './config/keys'
import cookieSession from 'cookie-session'
import passport from 'passport'
import cors from 'cors'

import './models/user-model'
import './services/passport'

mongoose.connect(sessionKeys.mongoURI)

const PORT = process.env.PORT || 5000
var app = require("express")();
var http = require("http").createServer(app); 
var io = require("socket.io")(http);

app.use(
    // defining a cookie which lasts for 30 days
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [sessionKeys.cookieKey]
    })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())


io.on('connection', socket => {
    console.log('new client connected!')
    socket.emit('hello', 'does this work?')
    socket.on('disconnect', () => console.log('client disconnected'))
})

require('./routes/authRoutes')(app)
require('./routes/fileManagmentRoutes')(app)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.get('/google511af4de7731d787.html', (req, res) => res.sendFile('client/public/google511af4de7731d787.html', { root: './' }))
http.listen(PORT, function() {
    console.log(`listening on *:${PORT}`);
  });
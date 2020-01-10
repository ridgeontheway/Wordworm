import express from 'express'
import mongoose from 'mongoose'
import { sessionKeys } from './config/keys'
import cookieSession from 'cookie-session'
import passport from 'passport'

import './models/user-model'
import './services/passport'

mongoose.connect(sessionKeys.mongoURI)

// Generates uses a express object which will listen for incoming requests, and will be mapped to route handlers
const app: express.Application = express()
// the app.use is allowing the middleware modules to be easily plugged into the application
// they essentially intercept the request and modify it before it being sent to the route handler
app.use(
    // defining a cookie which lasts for 30 days
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [sessionKeys.cookieKey]
    })
)
app.use(passport.initialize())
app.use(passport.session())

// we assign the app to this module, allowing for the routing to take place
require('./routes/authRoutes')(app)

if (process.env.NODE_ENV === 'production') {
    // express will serve up production assets (main.js, main.css) if we get a request that we are not familiar with
    app.use(express.static('client/build'))
    // express will serve up index.html file
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// simple testing
app.get('/google38350913c62e1601.html', (req, res) => res.sendFile('google38350913c62e1601.html', { root: '.' }))

const PORT = process.env.PORT || 5000
app.listen(PORT)
import express from 'express'
import mongoose from 'mongoose'
import { sessionKeys } from './config/keys'
import cookieSession from 'cookie-session'
import passport from 'passport'

import './models/user-model'
import './services/passport'

mongoose.connect(sessionKeys.mongoURI)

const app: express.Application = express()
app.use(
    // defining a cookie which lasts for 30 days
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [sessionKeys.cookieKey]
    })
)
app.use(passport.initialize())
app.use(passport.session())

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

const PORT = process.env.PORT || 5000
app.listen(PORT)
import express from 'express'
import { sessionKeys } from './config/sessionKeys/keys'
import { createServer } from 'http'
import cookieSession from 'cookie-session'
import passport from 'passport'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

// Importing OAUTH service
import './app/services/passportService'
// Connecting to DB
mongoose.connect(sessionKeys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const PORT = process.env.PORT || 5000
var app: express.Application = express()
var http = createServer(app)
var io = require('socket.io').listen(http)

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [sessionKeys.cookieKey]
  })
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())

require('./config/routes/authRoutes')(app)
require('./config/routes/bookProgressRoutes')(app)
require('./config/routes/fileManagmentRoutes')(app)
require('./config/routes/socketRoutes')(io)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.get('/google511af4de7731d787.html', (req, res) =>
  res.sendFile('client/public/google511af4de7731d787.html', { root: './' })
)

http.listen(PORT, function() {
  console.log(`listening on *:${PORT}`)
})

import passport from 'passport'
import { sessionKeys } from '../config/keys'

module.exports = (app) => {
    app.get(
    '/auth/google',
    passport.authenticate('google', {
        // what are we looking for in google? || what permissions are we looking for
        scope: ['profile', 'email']
        })
    )

    // Passport is going to see the code in the callback and we are going to exchange the code for the user profile
    app.get(
        '/auth/google/callback',
         passport.authenticate('google'),
         (req, res) => {
             res.redirect(sessionKeys.logInRedirectURL)
         })

    app.get('/api/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })
}

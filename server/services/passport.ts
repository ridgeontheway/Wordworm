// will handle all the passport configuration for our project
import passport from 'passport'
import mongoose from 'mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { sessionKeys } from '../config/keys';
import { Users } from '../models/user-model';

const User = mongoose.model('Users');

// we are turning a user account into a cookie to be given back to the client
passport.serializeUser<any, any>((user, done) => {
  // we are referencing the id of the user we are looking at
  // once the user finishes the OAUTH flow, we only care about the user id
  done("", user.id);
})

// we are taking a cookie and converting it back into a user account that we can look at
passport.deserializeUser<any, any>((id, done) => {
  User.findById(id).then(user => {
    done("", user);
  })
});

// GoogleStrategy == "I am known as the strategy 'google'
passport.use(
  new GoogleStrategy(
    {
      clientID: sessionKeys.googleClientID,
      clientSecret: sessionKeys.googleClientSecret, 
      callbackURL: sessionKeys.googleCallBackURL,
    }, 
    // we get the access token when we have completed the authentication flow
    // accessToken = the token which allows us to do stuff on their behalf
    // refreshToken = allows us to refresh the accessToken (which expires after an amount of time)
    // profile = the users google profile
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id })

      if(existingUser){
          // we already have the user saved in the database, this will be null if an existing user was not found
        return done("", existingUser);
      }
      // we need to save the user in the database
      const savedUser = await new User({ googleID: profile.id }).save()
      done("", savedUser);
    }
  )
)
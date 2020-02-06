// will handle all the passport configuration for our project
import passport from 'passport'
import mongoose from 'mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { sessionKeys } from '../config/keys';

const User = mongoose.model('Users');

passport.serializeUser<any, any>((user, done) => {
  done("", user.id);
})

passport.deserializeUser<any, any>((id, done) => {
  User.findById(id).then(user => {
    done("", user);
  })
});

passport.use(
  new GoogleStrategy(
    {
      clientID: sessionKeys.googleClientID,
      clientSecret: sessionKeys.googleClientSecret, 
      callbackURL: sessionKeys.googleCallBackURL,
    }, 
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id })

      if (existingUser){
        return done("", existingUser);
      }
      // we need to save the user in the database
      const savedUser = await new User({ googleID: profile.id }).save()
      done("", savedUser);
    }
  )
)
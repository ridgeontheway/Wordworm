// will handle all the passport configuration for our project
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { controller as UserDataController } from "../../config/controllers/dataControllers/UserControllers";
import { sessionKeys } from "../../config/sessionKeys/keys";

passport.serializeUser<any, any>((user, done) => {
  console.log("we are trying to serialiseUser: ", user);
  done("", user.id);
});

passport.deserializeUser<any, any>((id, done) => {
  console.log(
    "we are now trying to deserialiseUser who has the following doucmentID: ",
    id
  );
  UserDataController.findById(id, (error, savedUser) => {
    done("", savedUser);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: sessionKeys.googleClientID,
      clientSecret: sessionKeys.googleClientSecret,
      callbackURL: sessionKeys.googleCallBackURL
    },
    async (accessToken, refreshToken, profile, done) => {
      // Based on the User's Profile.id (googleID), we check to see if they exist within the DB
      UserDataController.retrieve(profile.id, (error, existingUser) => {
        console.log(
          "|| we are trying find the user with the following ID: ",
          profile.id
        );
        if (error)
          console.error("error when retrieving existing user: ", error);
        if (existingUser != null) {
          console.log("---we have found the existing user---");
          console.log(existingUser);
          done("", existingUser);
        }
        // If a user does not exist, we add them to the DB
        else {
          UserDataController.create(profile.id, (error, newUser) => {
            console.log("this is the new user: ", newUser);
            if (error)
              console.error(
                "we got an error when creating a new user: ",
                error
              );
            if (newUser) {
              done("", newUser);
            }
          });
        }
      });
    }
  )
);

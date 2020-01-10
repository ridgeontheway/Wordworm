module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  googleCallBackURL: 'https://emaily-udemy-learning.herokuapp.com/auth/google/callback',
  logInRedirectURL: '/surveys'
}

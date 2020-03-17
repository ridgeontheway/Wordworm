module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  googleCallBackURL: 'https://wordworm.herokuapp.com/auth/google/callback',
  logInRedirectURL: '/surveys',
  AWSAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  AWSSecretKey: process.env.AWS_SECRET_KEY,
  AWSBucketName: process.env.AWS_BUCKET_NAME
}

class Keys {
  public googleClientID: string;
  public googleClientSecret: string;
  public mongoURI: string;
  public cookieKey: string;
  public googleCallBackURL: string;
  public logInRedirectURL: string;

  constructor() {
    var importedModule: { googleClientID: string; googleClientSecret: string; mongoURI: string; cookieKey: string; googleCallBackURL: string; logInRedirectURL: string };

    if(process.env.NODE_ENV === 'production'){
      importedModule = require('./prod')
    }
    else {
      importedModule = require('./dev')
    }

    this.googleClientID = importedModule.googleClientID!;
    this.googleClientSecret = importedModule.googleClientSecret!;
    this.mongoURI = importedModule.mongoURI!;
    this.cookieKey = importedModule.cookieKey!;
    this.googleCallBackURL = importedModule.googleCallBackURL!;
    this.logInRedirectURL = importedModule.logInRedirectURL!;
  }
}
export const sessionKeys = new Keys()
# Wordworm

<img align="right" width="150" height="190" src="https://seeklogo.com/images/U/University_College_Dublin_FC-logo-4F4707D61E-seeklogo.com.png">

### Prerequisites

In order to run this project (locally) you will need:

- [Node.js](https://nodejs.org/en/)
- [API Key for Google Cloud Speech-To-Text](https://cloud.google.com/speech-to-text)
- [MongoDB URI](https://docs.mongodb.com/guides/server/drivers/)
- [AWS (S3) Access Key ID](https://aws.amazon.com/s3/)
- [AWS (S3) Access Key](https://aws.amazon.com/s3/)

Alternatively, you can view this project on [Heroku](https://wordworm.herokuapp.com/). Please note that, since the free-tier is being used, the initial response from the server may be slow.

### Running the Project

After downloading/configuring the necessary dependencies listed above, the steps outlined below can be followed to get the project running

```
1. Clone or download this repository
2. Using /api.config/sessionKeys/prod.js as a base, create 'dev.js' within the '/api/config/sessionKeys' file path
3. Populate 'dev.js' with the required infomation
4. Open a terminal at the root of this project and type 'npm run dev'
```

## Authors

- **George Ridgway** - _16201972_

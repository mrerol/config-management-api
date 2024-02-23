# Config Management API

## Description
This project is developing an API to facilitate the management of configurations for web applications. Leveraging ```Node.js```, it establishes a ```RESTful API``` to deliver configuration data in ```JSON``` format.

## Dependencies
```json
"dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.18.2",
    "firebase-admin": "^12.0.0",
    "http-status": "^1.7.3"
  }
```

## Environment Variables
```bash
ACCESS_TOKEN=
PORT=3000
FIREBASE_COLLECTION_NAME=configs
FIREBASE_SERVICE_ACCOUNT=
```

Place these variables in the ```.env``` file in the same directory as ```app.js```.

- ```ACCESS_TOKEN``` is the static token for authentication.

- ```FIREBASE_COLLECTION_NAME``` is the collection name in the Firebase.

- ```FIREBASE_SERVICE_ACCOUNT``` represents the settings for the Firebase service account.

## Installation

You can use the following commands to install the project.

```bash
git clone <repository-url>
cd <repository-name>
npm install
node app.js
```

## Deployment

The application has been deployed to the [Heroku](https://config-management-api-00eeb967ff68.herokuapp.com/).
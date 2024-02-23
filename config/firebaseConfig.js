import admin from 'firebase-admin';
import config from './dotenvSetup.js';

try {
  config();
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || {} ))
  });
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw new Error('Failed to initialize Firebase. Check your configuration.');
}

export default admin;


import admin from '../config/firebaseConfig.js';
import config from '../config/dotenvSetup.js';

class ConfigService {

  constructor() {
    try {
      config();
      const collectionName = process.env.FIREBASE_CONFIGS_COLLECTION_NAME;
      this.configCollection = admin.firestore().collection(collectionName);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getAllConfigs() {
    try {
      const snapshot = await this.configCollection.get();
      const configs = {};
      snapshot.forEach((doc) => {
        configs[doc.get('paramKey')] = doc.get('value');
      });
      return configs;
    } catch (error) {
      console.error('Error fetching configs:', error);
      throw error;
    }
  }
}

export default ConfigService;
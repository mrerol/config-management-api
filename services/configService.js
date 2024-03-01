import admin from '../config/firebaseConfig.js';
import CommonUtils from '../utils/CommonUtils.js';
import config from '../config/dotenvSetup.js';

class ConfigService {

    constructor() {
        try {
            config();
            const collectionName = process.env.FIREBASE_COLLECTION_NAME;
            this.configCollection = admin.firestore().collection(collectionName);
            this.fieldValue = admin.firestore.FieldValue
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getAllConfigs() {
        try {
            const snapshot = await this.configCollection.get();
            const configs = [];
            snapshot.forEach((doc) => {
                configs.push(this.mapConfigData(doc));
            });
            return configs;
        } catch (error) {
            console.error('Error fetching configs:', error);
            throw error;
        }
    }

    async addConfig(description, paramKey, value) {
        try {
            const batch = admin.firestore().batch();
            const docRef = this.configCollection.doc();
            batch.set(docRef, {
                createDate: this.fieldValue.serverTimestamp(),
                description,
                paramKey,
                value,
                updatedAt: this.fieldValue.serverTimestamp(),
            });
            await batch.commit();
            const newDoc = await docRef.get();
            return this.mapConfigData(newDoc);
        } catch (error) {
            console.error('Error adding config: ', error);
            throw error;
        }
    }

    mapConfigData(doc) {
        return {
            id: doc.id,
            description: doc.get('description'),
            paramKey: doc.get('paramKey'),
            value: doc.get('value'),
            createDate: CommonUtils.formatDate(doc.get('createDate')),
            updatedAt: CommonUtils.formatDate(doc.get('updatedAt')),
        };
    }

    async deleteConfig(configId) {
        try {
            const configDoc = await this.getConfigDoc(configId);
            await configDoc.ref.delete();
            console.log('Config deleted successfully!');
        } catch (error) {
            console.error('Error deleting config: ', error);
            throw error;
        }
    }

    async getConfigDoc(configId) {
        const configDoc = await this.configCollection.doc(configId).get();
        this.checkConfigDocExists(configDoc, configId);
        return configDoc;
    }

    checkConfigDocExists(configDoc, configId) {
        if (!configDoc.exists) {
            console.log(`Config with ID ${configId} does not exist.`);
            throw new Error(`Config with ID ${configId} does not exist.`);
        }
    }

    async updateConfig(configId, newData) {
        try {
            const lockRef = admin.firestore().collection("locks").doc(configId);
            const existingLock = await lockRef.get();
            if (existingLock.exists) {
                console.log(`Config with ID ${configId} is already locked.`);
                throw new Error('conflict');
            }
            await admin.firestore().runTransaction(async (transaction) => {
                console.log("inside transaction");
                const lockSnapshot = await transaction.get(lockRef);
                if (lockSnapshot.exists) {
                    console.log(`Config with ID ${configId} is already locked.`);
                    throw new Error('conflict');
                }
                transaction.set(lockRef, {
                    configId,
                    lockedAt: new Date(),
                });
                console.log(`Lock for config ID ${configId} created.`);
            });
            await admin.firestore().runTransaction(async (transaction) => {
                const configDoc = await transaction.get(this.configCollection.doc(configId));
                this.checkConfigDocExists(configDoc, configId);
                transaction.update(this.configCollection.doc(configId), {
                    ...newData,
                    updatedAt: this.fieldValue.serverTimestamp(),
                });
                console.log('Configuration updated successfully!');
            });
            await lockRef.delete();
            console.log(`Lock for config ID ${configId} released.`);
        } catch (error) {
            console.error('Error updating config: ', error);
            throw error;
        }
    }
}

export default ConfigService;

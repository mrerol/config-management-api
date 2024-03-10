import admin from '../config/firebaseConfig.js';
import CommonUtils from '../utils/CommonUtils.js';
import config from '../config/dotenvSetup.js';

class PanelService {

    constructor() {
        try {
            config();
            const collectionName = process.env.FIREBASE_CONFIGS_COLLECTION_NAME;
            this.configCollection = admin.firestore().collection(collectionName);
            this.locksName = process.env.FIREBASE_LOCKS_COLLECTION_NAME;
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

    async getConfigById(configId) {
        try {
            const config = await this.getConfigDoc(configId);
            return this.mapConfigData(config);
        } catch (error) {
            console.error('Error deleting config: ', error);
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
        try {
            const configDoc = await this.configCollection.doc(configId).get();
            this.checkConfigDocExists(configDoc, configId);
            return configDoc;
        } catch (error) {
            console.error('Error fetching config: ', error);
            throw error;
        }
    }

    checkConfigDocExists(configDoc, configId) {
        if (!configDoc.exists) {
            console.log(`Config with ID ${configId} does not exist.`);
            throw new Error(`Config with ID ${configId} does not exist.`);
        }
    }

    async updateConfig(configId, newData, lockTimeout = 300000) {
        try {
            // Locking transaction
            await admin.firestore().runTransaction(async (transaction) => {
                const lockRef = admin.firestore().collection(this.locksName).doc(configId);
                const existingLock = await transaction.get(lockRef);
                if (existingLock.exists) {
                    const lockedAt = existingLock.data().lockedAt.toMillis();
                    const currentTime = new Date().getTime();
                    if (currentTime - lockedAt > lockTimeout) {
                        console.log(`Lock for config ID ${configId} has expired. Releasing lock.`);
                        transaction.delete(lockRef);
                    } else {
                        console.log(`Config with ID ${configId} is already locked.`);
                        throw new Error('conflict');
                    }
                }
                transaction.set(lockRef, {
                    configId,
                    lockedAt: new Date(),
                });
                console.log(`Lock for config ID ${configId} created.`);
            });
            // Updating transaction
            await admin.firestore().runTransaction(async (transaction) => {
                const configDoc = await transaction.get(this.configCollection.doc(configId));
                this.checkConfigDocExists(configDoc, configId);
                transaction.update(this.configCollection.doc(configId), {
                    ...newData,
                    updatedAt: this.fieldValue.serverTimestamp(),
                });
                console.log('Configuration updated successfully!');
            });
        } catch (error) {
            console.error('Error updating config: ', error);
            throw error;
        } finally {
            try {
                await admin.firestore().collection(this.locksName).doc(configId).delete();
                console.log(`Lock for config ID ${configId} released.`);
            } catch (deleteError) {
                console.error('Error releasing lock: ', deleteError);
                throw deleteError;
            }
        }
    }

    async checkLock(configId) {
        try {
            // Locking check transaction
            return admin.firestore().runTransaction(async (transaction) => {
                const lockRef = admin.firestore().collection(this.locksName).doc(configId);
                const existingLock = await transaction.get(lockRef);
                if (existingLock.exists) {
                    return true;
                }
                return false;
            });
        } catch (error) {
            console.error('Error updating config: ', error);
            throw error;
        }
    }
}
export default PanelService;

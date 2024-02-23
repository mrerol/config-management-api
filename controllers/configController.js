import ConfigService from '../services/configService.js';
import CommonUtils from '../utils/CommonUtils.js';

export async function getAllConfigs(req, res, next) {
   try {
      const configs = await ConfigService.getAllConfigs();
      CommonUtils.handleSuccess(res, { configs });
   } catch (error) {
      CommonUtils.handleError(res, error);
   }
}

export async function addConfig(req, res, next) {
   try {
      const { description, paramKey, value } = req.body;
      const config = await ConfigService.addConfig(description, paramKey, value);
      CommonUtils.handleSuccess(res, { config });
   } catch (error) {
      CommonUtils.handleError(res, error);
   }
}

export async function deleteConfig(req, res, next) {
   try {
      const configId = req.params.id;
      await ConfigService.deleteConfig(configId);
      CommonUtils.handleSuccess(res);
   } catch (error) {
      CommonUtils.handleError(res, error);
   }
}

export async function updateConfig(req, res, next) {
   try {
      const configId = req.params.id;
      const newData = req.body;
      await ConfigService.updateConfig(configId, newData);
      CommonUtils.handleSuccess(res);
   } catch (error) {
      CommonUtils.handleError(res, error);
   }
}

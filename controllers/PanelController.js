import CommonUtils from '../utils/CommonUtils.js';

class PanelController {

   constructor(service) {
      PanelController.ConfigService = service;
   }

   async getAllConfigs(req, res) {
      try {
         const configs = await PanelController.ConfigService.getAllConfigs();
         CommonUtils.handleSuccess(res, { configs });
      } catch (error) {
         CommonUtils.handleError(res, error);
      }
   }

   async getConfigById(req, res) {
      try {
         const configId = req.params.id;
         const config = await PanelController.ConfigService.getConfigById(configId);
         CommonUtils.handleSuccess(res, config);
      } catch (error) {
         CommonUtils.handleError(res, error);
      }
   }

   async addConfig(req, res) {
      try {
         const { description, paramKey, value } = req.body;
         const config = await PanelController.ConfigService.addConfig(description, paramKey, value);
         CommonUtils.handleSuccess(res, { config });
      } catch (error) {
         CommonUtils.handleError(res, error);
      }
   }

   async deleteConfig(req, res) {
      try {
         const configId = req.params.id;
         await PanelController.ConfigService.deleteConfig(configId);
         CommonUtils.handleSuccess(res);
      } catch (error) {
         CommonUtils.handleError(res, error);
      }
   }

   async updateConfig(req, res) {
      try {
         const configId = req.params.id;
         const newData = req.body;
         await PanelController.ConfigService.updateConfig(configId, newData);
         CommonUtils.handleSuccess(res);
      } catch (error) {
         CommonUtils.handleError(res, error);
      }
   }

   async checkLock(req, res) {
      try {
         const configId = req.params.id;
         const result = await PanelController.ConfigService.checkLock(configId);
         CommonUtils.handleSuccess(res, { lock: result })
      } catch (error) {
         CommonUtils.handleError(res, error);
      }
   }
}

export default PanelController;
import CommonUtils from '../utils/CommonUtils.js';

class ConfigController {

   constructor(service) {
      ConfigController.configService = service;
   }

   async getAllConfigs(req, res) {
      try {
         const configs = await ConfigController.configService.getAllConfigs();
         CommonUtils.handleSuccess(res, { configs });
      } catch (error) {
         CommonUtils.handleError(res, error);
      }
   }

   async addConfig(req, res) {
      try {
         const { description, paramKey, value } = req.body;
         const config = await ConfigSthis.configServiceervice.addConfig(description, paramKey, value);
         CommonUtils.handleSuccess(res, { config });
      } catch (error) {
         CommonUtils.handleError(res, error);
      }
   }

   async deleteConfig(req, res) {
      try {
         const configId = req.params.id;
         await this.configService.deleteConfig(configId);
         CommonUtils.handleSuccess(res);
      } catch (error) {
         CommonUtils.handleError(res, error);
      }
   }

   async updateConfig(req, res) {
      try {
         const configId = req.params.id;
         const newData = req.body;
         await this.configService.updateConfig(configId, newData);
         CommonUtils.handleSuccess(res);
      } catch (error) {
         CommonUtils.handleError(res, error);
      }
   }
}

export default ConfigController;
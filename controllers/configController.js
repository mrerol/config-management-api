import CommonUtils from '../utils/CommonUtils.js';

class ConfigController {

  constructor(service) {
    ConfigController.ConfigService = service;
  }

  async getAllConfigs(req, res) {
    try {
      const configs = await ConfigController.ConfigService.getAllConfigs();
      CommonUtils.handleSuccess(res, { configs });
    } catch (error) {
      CommonUtils.handleError(res, error);
    }
  }
}

export default ConfigController;
import Router from 'express';
import authToken from '../middleware/authToken.js';
import ConfigService from '../services/configService.js';
import ConfigController from '../controllers/configController.js';

const configRouter = Router();

const configService = new ConfigService();
const configController = new ConfigController(configService);

configRouter.route("/get/all").get(authToken, configController.getAllConfigs);

export default configRouter;

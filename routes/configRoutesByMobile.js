import Router from 'express';
import authToken from '../middleware/authToken.js';
import authUser from '../middleware/authUser.js';
import ConfigService from '../services/configService.js';
import ConfigController from '../controllers/configController.js';

const routeByMobile = Router();

const configService = new ConfigService();
const configController = new ConfigController(configService);

routeByMobile.route("/get/all").get(authToken, configController.getAllConfigs);
routeByMobile.route("/get").get(authUser, configController.getAllConfigs);
routeByMobile.route("/add").post(authUser, configController.addConfig);
routeByMobile.route("/delete/:id").delete(authUser, configController.deleteConfig);
routeByMobile.route("/update/:id").put(authUser, configController.updateConfig);

export default routeByMobile;

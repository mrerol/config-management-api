import Router from 'express';
import authToken from '../middleware/authToken.js';
import authUser from '../middleware/authUser.js';
import ConfigService from './configService.js';
import ConfigServiceByMobile from './configServiceByMobile.js';
import ConfigController from '../controllers/configController.js';
import detectDeviceType from '../middleware/deviceType.js';

const routerByServices = Router();

const configService = new ConfigService();
const configServiceByMobile = new ConfigServiceByMobile(configService);

const configController = new ConfigController(configService);
const configControllerByMobile = new ConfigController(configServiceByMobile);

const controllersByDeviceType = {
  web: configController,
  mobile: configControllerByMobile,
};

const handleRequest = (req, res, controllerMethod) => {
  const { deviceType } = req;
  const controller = controllersByDeviceType[deviceType] || configController;

  controllerMethod(controller, req, res);
};

routerByServices.route("/get/all").get(authToken, detectDeviceType, (req, res) => {
  handleRequest(req, res, (controller, req, res) => controller.getAllConfigs(req, res));
});

routerByServices.route("/get").get(authUser, detectDeviceType, (req, res) => {
  handleRequest(req, res, (controller, req, res) => controller.getAllConfigs(req, res));
});

routerByServices.route("/add").post(authUser, detectDeviceType, (req, res) => {
  handleRequest(req, res, (controller, req, res) => controller.addConfig(req, res));
});

routerByServices.route("/delete/:id").delete(authUser, detectDeviceType, (req, res) => {
  handleRequest(req, res, (controller, req, res) => controller.deleteConfig(req, res));
});

routerByServices.route("/update/:id").put(authUser, detectDeviceType, (req, res) => {
  handleRequest(req, res, (controller, req, res) => controller.updateConfig(req, res));
});

export default routerByServices;

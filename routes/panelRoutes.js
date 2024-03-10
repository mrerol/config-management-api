import Router from 'express';
import authToken from '../middleware/authToken.js';
import authUser from '../middleware/authUser.js';
import PanelService from '../services/PanelService.js';
import PanelController from '../controllers/panelController.js';

const panelRouter = Router();

const panelService = new PanelService();
const panelController = new PanelController(panelService);

panelRouter.route("/get/all").get(authToken, panelController.getAllConfigs)
panelRouter.route("/get").get(authUser, panelController.getAllConfigs)
panelRouter.route("/get/:id").get(authUser, panelController.getConfigById)
panelRouter.route("/add").post(authUser, panelController.addConfig)
panelRouter.route("/delete/:id").delete(authUser, panelController.deleteConfig)
panelRouter.route("/update/:id").put(authUser, panelController.updateConfig)
panelRouter.route("/check-lock/:id").get(authUser, panelController.checkLock)

export default panelRouter;

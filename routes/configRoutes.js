import Router from 'express';
import authToken from '../middleware/authToken.js';
import authUser from '../middleware/authUser.js';
import ConfigService from '../services/ConfigService.js';
import ConfigController from '../controllers/ConfigController.js';

const router = Router();

const configService = new ConfigService();
const configController = new ConfigController(configService);

router.route("/get/all").get(authToken, configController.getAllConfigs)
router.route("/get").get(authUser, configController.getAllConfigs)
router.route("/add").post(authUser, configController.addConfig)
router.route("/delete/:id").delete(authUser, configController.deleteConfig)
router.route("/update/:id").put(authUser, configController.updateConfig)

export default router;

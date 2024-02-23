import Router from 'express';
import authToken from '../middleware/authToken.js';
import authUser from '../middleware/authUser.js';
import { getAllConfigs, addConfig, updateConfig, deleteConfig } from '../controllers/configController.js';

const router = Router();

router.route("/get/all").get(authToken, getAllConfigs)
router.route("/get").get(authUser, getAllConfigs)
router.route("/add").post(authUser, addConfig)
router.route("/delete/:id").delete(authUser, deleteConfig)
router.route("/update/:id").put(authUser, updateConfig)

export default router;

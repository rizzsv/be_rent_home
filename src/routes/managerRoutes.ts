import express from 'express';
import {
    getManager,
    CreateManager,
    UpdateManager,
    getManagerProperty
} from "../controllers/managerControllers"

const router = express.Router();

router.get("/:cognitoId", getManager);
router.get("/:cognitoId", UpdateManager)
router.get("/:cognitoId/properties", getManagerProperty)
router.post("/", CreateManager)

export default router;
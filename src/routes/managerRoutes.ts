import express from 'express';
import {
    getManager,
    CreateManager,
    UpdateManager
} from "../controllers/managerControllers"

const router = express.Router();

router.get("/:cognitoId", getManager);
router.get("/:cognitoId", UpdateManager)
router.post("/", CreateManager)

export default router;
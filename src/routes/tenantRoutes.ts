import express from 'express';
import {
    getTenant,
    CreateTenant,
    UpdateTenant
} from "../controllers/tenantControllers"

const router = express.Router();

router.get("/:cognitoId", getTenant);
router.put("/:cognitoId", UpdateTenant)
router.post("/", CreateTenant)

export default router;
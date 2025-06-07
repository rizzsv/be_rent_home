import express from 'express';
import {
    getTenant,
    CreateTenant,
    UpdateTenant,
    GetCurrentResidence,
    AddFavoriteProperty,
    RemoveFavoriteProperty
} from "../controllers/tenantControllers"

const router = express.Router();

router.get("/:cognitoId", getTenant);
router.put("/:cognitoId", UpdateTenant)
router.post("/", CreateTenant)
router.get("/:cognitoId/curent-residences", GetCurrentResidence)
router.post("/:cognitoId/favorites/:propertyId", AddFavoriteProperty)
router.delete("/:cognitoId/favorites/:propertyId", RemoveFavoriteProperty)

export default router;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tenantControllers_1 = require("../controllers/tenantControllers");
const router = express_1.default.Router();
router.get("/:cognitoId", tenantControllers_1.getTenant);
router.put("/:cognitoId", tenantControllers_1.UpdateTenant);
router.post("/", tenantControllers_1.CreateTenant);
router.get("/:cognitoId/curent-residences", tenantControllers_1.GetCurrentResidence);
router.post("/:cognitoId/favorites/:propertyId", tenantControllers_1.AddFavoriteProperty);
router.delete("/:cognitoId/favorites/:propertyId", tenantControllers_1.RemoveFavoriteProperty);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const managerControllers_1 = require("../controllers/managerControllers");
const router = express_1.default.Router();
router.get("/:cognitoId", managerControllers_1.getManager);
router.get("/:cognitoId", managerControllers_1.UpdateManager);
router.get("/:cognitoId/properties", managerControllers_1.getManagerProperty);
router.post("/", managerControllers_1.CreateManager);
exports.default = router;

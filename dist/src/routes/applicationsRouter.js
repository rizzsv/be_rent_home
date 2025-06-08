"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const aplicationControllers_1 = require("../controllers/aplicationControllers");
const router = express_1.default.Router();
router.post("/", (0, authMiddleware_1.authMiddleware)(["tenant"]), aplicationControllers_1.createApplications);
router.put("/:id/status", (0, authMiddleware_1.authMiddleware)(["manager"]), aplicationControllers_1.updateApplication);
router.get("/", (0, authMiddleware_1.authMiddleware)(["manager", "tenant"]), aplicationControllers_1.listApplication);
exports.default = router;

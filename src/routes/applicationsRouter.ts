import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createApplications, listApplication, updateApplication } from '../controllers/aplicationControllers';

const router = express.Router();

router.post("/", authMiddleware([ "tenant"]), createApplications);
router.put("/:id/status", authMiddleware(["manager"]), updateApplication);
router.get("/", authMiddleware(["manager", "tenant"]), listApplication);
export default router;
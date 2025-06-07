import express from "express";
import multer from "multer";
import {getproperties, getProperty, createProperty} from "../controllers/propertyControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", getproperties);
router.get("/:id", getProperty); 
router.post("/", authMiddleware(["manager"]),
upload.array("photos"),
createProperty
);

export default router;
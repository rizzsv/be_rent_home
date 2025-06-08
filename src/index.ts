import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { authMiddleware } from "./middleware/authMiddleware";

/** ROUTE IMPORT */
import tenantRoutes from "./routes/tenantRoutes";
import managerRoutes from "./routes/managerRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import leaseRouter from "./routes/leaseRoutes";
import applicationRouter from "./routes/applicationsRouter";

/** Router Import */

// Config
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/** Routes */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/applications", applicationRouter)
app.use("/properties", propertyRoutes)
app.use("/leases", leaseRouter)
app.use("/tenants", authMiddleware(["tenant"]), tenantRoutes)
app.use("/managers", authMiddleware(["manager"]), managerRoutes);

/** Server */
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
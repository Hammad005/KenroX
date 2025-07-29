import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { generatePlanHandler } from "../controllers/planControllers.js";

const planRoutes = express.Router();

planRoutes.use(protectRoute);

planRoutes.post('/generate', generatePlanHandler);

export default planRoutes;
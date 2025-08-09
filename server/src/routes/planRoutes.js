import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { activePlan, deletePlanHandler, generatePlanHandler, getPlanHandler } from "../controllers/planControllers.js";

const planRoutes = express.Router();

planRoutes.use(protectRoute);

planRoutes.post('/generate', generatePlanHandler);

planRoutes.put('/active/:id', activePlan);

planRoutes.get('/getPlan', getPlanHandler);

planRoutes.delete('/deletePlan/:id', deletePlanHandler);

export default planRoutes;
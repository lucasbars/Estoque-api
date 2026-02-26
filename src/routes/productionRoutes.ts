import { Router } from "express";
import { ProductionController } from "../controllers/productionController";

const router = Router();

router.get("/suggestion", ProductionController.getSuggestion);

export default router;

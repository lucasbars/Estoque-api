import { Router } from "express";
import { RawMaterialController } from "../controllers/rawMaterialController";

const router = Router();

router.get("/", RawMaterialController.getAll);
router.get("/:id", RawMaterialController.getById);
router.post("/", RawMaterialController.create);
router.put("/:id", RawMaterialController.update);
router.delete("/:id", RawMaterialController.remove);

export default router;

import { Router } from "express";
import { getMaintenance, addMaintenance, editMaintenance, removeMaintenance } from "../controllers/maintenanceController";

const router = Router();
router.get("/maintenance", getMaintenance);
router.post("/maintenance", addMaintenance);
router.put("/drivers/:driverId", editMaintenance);
router.delete("/drivers/:driverId", removeMaintenance);
export default router;

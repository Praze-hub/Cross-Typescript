import { Router } from "express";
import { getTrucks, addTruck, editTruck, removeTruck } from "../controllers/truckController";

const router = Router();
router.get("/trucks", getTrucks);
router.post("/trucks", addTruck);
router.put("/drivers/:driverId", editTruck);
router.delete("/drivers/:driverId", removeTruck);

export default router;

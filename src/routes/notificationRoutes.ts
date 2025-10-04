import { Router } from "express";
import { editNotification, getNotifications, removeNotification, triggerNotification } from "../controllers/notificationController";

const router = Router();
router.get("/notifications", getNotifications);
router.post("/notifications/send", triggerNotification);
router.put("/drivers/:driverId", editNotification);
router.delete("/drivers/:driverId", removeNotification);
export default router;

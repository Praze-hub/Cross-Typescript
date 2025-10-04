import { Router } from "express";
import { getTasks, addTask, editTask, removeTask } from "../controllers/taskController";

const router = Router();
router.get("/tasks", getTasks);
router.post("/tasks", addTask);
router.put("/drivers/:driverId", editTask);
router.delete("/drivers/:driverId", removeTask);
export default router;

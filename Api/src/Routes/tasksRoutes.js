import { Router } from "express";
//Controllers
import { addTask, getTasks } from "../Controllers/taskController.js";
const router = Router();
router.get("/tasks", getTasks)
router.post("/addTask", addTask)

export default router;

import { Router } from "express";
//Controllers
import { addTask, getTasKById, getTasks } from "../Controllers/taskController.js";
const router = Router();
router.get("/tasks", getTasks)
router.get("/tasks/:id", getTasKById);
router.post("/addTask", addTask)

export default router;

import { Router } from "express";
//Controllers
import { addTask, deleteTaskById, getTasKById, getTasks, putTaskById } from "../Controllers/taskController.js";
const router = Router();
router.get("/tasks", getTasks)
router.get("/tasks/:id", getTasKById);
router.put("/tasks/:id", putTaskById);
router.delete("/tasks/:id", deleteTaskById);

router.post("/addTask", addTask)

export default router;

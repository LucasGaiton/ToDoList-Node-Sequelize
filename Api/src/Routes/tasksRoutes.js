import { Router } from "express";
//Controllers
import { getTasks } from "../Controllers/taskController.js";
const router = Router();
router.get("/tasks", getTasks)

export default router;

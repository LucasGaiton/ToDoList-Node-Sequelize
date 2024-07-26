import express from "express";
import tasksRoutes from "./Routes/tasksRoutes.js";
import cron from 'node-cron';
import { updateExpiredTasks } from "./services/updateExpiredTasks.js";
import cors from 'cors';
const app = express();
//Midlewares
app.use(cors());
app.use(express.json());
app.use(tasksRoutes)
cron.schedule("* * * * *", updateExpiredTasks)


export default app;
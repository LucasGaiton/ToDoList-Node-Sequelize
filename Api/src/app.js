import express from "express";
import tasksRoutes from "./Routes/tasksRoutes.js";
const app = express();
//Midlewares
app.use(express.json());
app.use(tasksRoutes)

export default app;
import express from "express";
import tasksRoutes from "./Routes/tasksRoutes.js";
import cors from 'cors';
const app = express();
//Midlewares
app.use(cors());
app.use(express.json());
app.use(tasksRoutes)

export default app;
import { where } from "sequelize";
import { Task } from "../Models/Task.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        console.log("Entra a la perfeción");
        res.json(tasks)
    } catch (error) {
        console.log(error.message);
    }
}
export const getDuetasks = async (req, res) =>{
    try {
        const tasks = await Task.findAll({
            where : {
            status : true
        }});
        res.json(tasks)
    } catch (error) {
        console.log(error.message);
        
        
    }
}
export const addTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body)
        res.json(newTask);
    } catch (error) {
        console.log(error.message);

    }
}
export const getTasKById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findByPk(taskId)
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}
export const putTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        await Task.update(req.body, {
            where: {
                id: taskId
            }
        })
        res.send("Se actualizo la tarea")
    } catch (error) {
        res.status(500).send("Error")

    }
}
export const deleteTaskById = async (req,res) =>{
    try {
        const taskId = req.params.id;
        await Task.destroy({
            where: {
                id: taskId
            }
        })
        res.send("Se elimino la tarea")
    } catch (error) {
        res.status(500).send(error.message);
        
    }

}


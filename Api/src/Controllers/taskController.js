import { Task } from "../Models/Task.js";

export const getTasks= async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks)
    } catch (error) {
        console.log(error.message);

    }
}
export const addTask = async(req, res) =>{
    try {
        const newTask = await Task.create(req.body)
        res.json(newTask);
    } catch (error) {
        console.log(error.message);
        
    }
}
export const getTasKById = async (req, res) =>{
    try {
        const taskId = req.params.id;
        const task = await Task.findByPk(taskId)
        if(!task){
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({error:error.message});
        
    }
}


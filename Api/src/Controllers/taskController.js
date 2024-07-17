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
        const {content, dueDate} = req.body;
        const newTask = Task.create({content: content, dueDate: dueDate})
        res.json(newTask);
        
    } catch (error) {
        
    }
}


import {Op} from 'sequelize';
import { Task } from '../Models/Task.js';
import moment from 'moment-timezone';

export async function updateExpiredTasks() {
    // Convertir now a UTC
    const now = moment().utc().toDate();
    try {
        // Encuentra todas las tareas cuya fecha de vencimiento ha pasado y que aún no están marcadas como vencidas
        const tasks = await Task.findAll({
            where: {
                dueDate: { [Op.lt]: now }, // dueDate es menor que la fecha y hora actual
                status: false
            }
        });
        console.log("esto es la fecha actual " + now);
        console.log("esto es tasks " + tasks);
        for (let task of tasks) {
            task.status = true;
            await task.save();
        }
        console.log(`Updated ${tasks.length} tasks to status 'vencida'.`);

    } catch (error) {
        console.error('Error updating tasks:', error);
    }

}

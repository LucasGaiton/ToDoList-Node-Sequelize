import cron from 'node-cron';
import { Task } from '../Models/Task';

export async function updateExpiredTasks() {
    const now = new Date();
    try {
        // Encuentra todas las tareas cuya fecha de vencimiento ha pasado y que aún no están marcadas como vencidas
        const tasks = Task.findAll({
            where: {
                dueDate: { [Op.lt]: now }, // dueDate es menor que la fecha y hora actual
                status: false
            }
        });
        for (let task of tasks) {
            task.status = true;
            await task.save();
        }
        console.log(`Updated ${tasks.length} tasks to status 'vencida'.`);

    } catch (error) {
        console.error('Error updating tasks:', error);
    }
    
}
cron.schedule("* * * * *", updateExpiredTasks)
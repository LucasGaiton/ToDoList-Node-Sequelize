import "./src/Models/Task.js";
import server from "./src/app.js";
import sequelize from "./src/config/db.js";
async function despliegue() {
    try {
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    server.listen(3000, () => {
        console.log("El servidor esta escucachando en el puerto 3000");
    })
}
despliegue();


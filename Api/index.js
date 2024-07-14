const server = require("./src/app")
const { conn } = require("./src/db")

async function despliegue() {
    try {
        await conn.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    server.listen(3000, () => {
        console.log("El servidor esta escucachando en el puerto 3000");
    })
}
despliegue();


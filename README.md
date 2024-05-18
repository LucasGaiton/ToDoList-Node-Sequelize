# Proyecto ToDoList API

## Descripción del Proyecto

Este proyecto tiene como objetivo proporcionar una API RESTful para gestionar una lista de tareas (ToDoList). La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las tareas, facilitando la gestión de las mismas de una manera eficiente y escalable.

## Tecnologías Utilizadas

- **Node.js**: Plataforma de JavaScript para construir aplicaciones del lado del servidor.
- **Express.js**: Framework para Node.js que simplifica el desarrollo de aplicaciones web y APIs.
- **SQL**: Base de datos relacional para almacenar la información de las tareas.
- **Sequelize**: ORM (Object-Relational Mapping) para Node.js que facilita la interacción con bases de datos SQL.

## Funcionalidades

- **Crear una tarea**: Permite añadir una nueva tarea a la lista.
- **Leer tareas**: Permite obtener la lista de todas las tareas o una tarea específica por su ID.
- **Actualizar una tarea**: Permite modificar los detalles de una tarea existente.
- **Eliminar una tarea**: Permite eliminar una tarea de la lista.

## Endpoints de la API

- **POST /tasks**: Crea una nueva tarea.
- **GET /tasks**: Obtiene la lista de todas las tareas.
- **GET /tasks/:id**: Obtiene los detalles de una tarea específica.
- **PUT /tasks/:id**: Actualiza una tarea específica.
- **DELETE /tasks/:id**: Elimina una tarea específica.

## Ejemplo de Código

Aquí tienes un ejemplo de cómo se configura una ruta para crear una nueva tarea usando Express y Sequelize:

```javascript
const express = require('express');
const { Task } = require('./models');
const app = express();

app.use(express.json());

app.post('/tasks', async (req, res) => {
    try {
        const newTask = await Task.create({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

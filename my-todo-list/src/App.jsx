import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks'; // Reemplaza con la URL de tu backend

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

  // Función para obtener las tareas desde el backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Función para agregar una nueva tarea
  const addTask = async () => {
    if (newTask.trim() === '' || newDueDate.trim() === '') return;
    try {
      const response = await axios.post("http://localhost:3000/addTask", { content: newTask, dueDate: newDueDate });
      setTasks([...tasks, response.data]);
      setNewTask('');
      setNewDueDate('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Función para marcar una tarea como completada
  const toggleTaskCompletion = async (id, completed) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status: !completed });
      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, status: !task.status } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  // Función para actualizar la fecha de caducidad de una tarea
  const updateDueDate = async (id, dueDate) => {
    try {
      await axios.put(`${API_URL}/${id}`, { dueDate });
      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, dueDate } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating due date:', error);
    }
  };

  // Función para eliminar una tarea
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="input-group">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <input
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
          placeholder="Due date"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTaskCompletion(task.id, task.completed)}>
              {task.content} - Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
            {/* <input
              type="date"
              value={task.dueDate || ''}
              onChange={(e) => updateDueDate(task.id, e.target.value)}
            /> */}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks'; // Reemplaza con la URL de tu backend

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');
  const [editDueDate, setEditDueDate] = useState('');

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
  // Función para comenzar a editar una tarea
  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditText(task.text);
    setEditDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
  };
  // Función para cancelar la edición de una tarea
  const cancelEditing = () => {
    setEditingTask(null);
    setEditText('');
    setEditDueDate('');
  };
  // Función para guardar la edición de una tarea
  const saveEdit = async (id) => {
    if (editText.trim() === '' || editDueDate.trim() === '') return;
    try {
      await axios.patch(`${API_URL}/${id}`, { text: editText, dueDate: editDueDate });
      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, text: editText, dueDate: editDueDate } : task
      );
      setTasks(updatedTasks);
      cancelEditing();
    } catch (error) {
      console.error('Error saving edit:', error);
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
            {editingTask === task.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <input
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                />
                <button className="save-button" onClick={() => saveEdit(task.id)}>Save</button>
                <button className="cancel-button" onClick={cancelEditing}>Cancel</button>
              </div>
            ) : (
              <>
                <div className="task-content">
                  <span onClick={() => toggleTaskCompletion(task.id, task.completed)}>
                    {task.content}
                  </span>
                  <span className="due-date">{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="task-actions">
                  <button onClick={() => startEditing(task)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
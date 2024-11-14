// App.js
import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const addTask = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/tasks", {
      title: newTask,
      description: "",
    });
    setNewTask("");
    fetchTasks();
  };

  const toggleTask = async (id, completed) => {
    await axios.put(`http://localhost:5000/tasks/${id}`, {
      completed: !completed,
    });
    fetchTasks();
  };
  const updateTask = async (id, title, icon) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, {
        title: title,
        icon: icon,
      });
      fetchTasks();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche :", error);
    }
  };
  

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
    
      {/* Intégration de TaskList ici */}
      <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} updateTask={updateTask} />
    </div>
  );
}
export default App;

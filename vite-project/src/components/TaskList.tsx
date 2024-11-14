import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, CheckSquare, Square, Edit2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, Briefcase, ShoppingCart, Book, Utensils, Plane, Music, Camera, Smile } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Task = { id: number; title: string; description: string; completed: boolean; icon: string };
type IconOption = { value: string; icon: React.ElementType };

const iconOptions: IconOption[] = [
  { value: 'Home', icon: Home },
  { value: 'Briefcase', icon: Briefcase },
  { value: 'ShoppingCart', icon: ShoppingCart },
  { value: 'Book', icon: Book },
  { value: 'Utensils', icon: Utensils },
  { value: 'Plane', icon: Plane },
  { value: 'Music', icon: Music },
  { value: 'Camera', icon: Camera },
  { value: 'Smile', icon: Smile },
];

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskIcon, setNewTaskIcon] = useState('Home');
  const [activeTab, setActiveTab] = useState('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);  

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
    }
  };

  const addTask = async () => {
    if (newTaskTitle.trim() !== '') {
      try {
        const response = await axios.post("http://localhost:5000/tasks", {
          title: newTaskTitle,
          description: newTaskDescription,
          icon: newTaskIcon,
          completed: false
        });
        setTasks([...tasks, response.data]);
        setNewTaskTitle('');
        setNewTaskDescription('');
        setNewTaskIcon('Home');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la tâche :', error);
      }
    }
  };

  const saveTaskEdit = async () => {
    if (editingTask) {
      try {
        const updatedTask = { ...editingTask, title: newTaskTitle, description: newTaskDescription, icon: newTaskIcon };
        await axios.put(`http://localhost:5000/tasks/${editingTask.id}`, updatedTask);
        setTasks(tasks.map(task => (task.id === editingTask.id ? updatedTask : task)));
        setEditingTask(null);
        setNewTaskTitle('');
        setNewTaskDescription('');
        setNewTaskIcon('Home');
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la tâche:', error);
      }
    }
  };

  const toggleComplete = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      try {
        const updatedTask = { ...task, completed: !task.completed };
        await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask);
        setTasks(tasks.map(t => (t.id === id ? updatedTask : t)));
      } catch (error) {
        console.error('Erreur lors du changement d\'état de la tâche :', error);
      }
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche :', error);
    }
  };

  // Filtrage des tâches en fonction de l'onglet actif
  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return !task.completed;
    if (activeTab === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-emerald-600">Ma Liste de Tâches</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-3 bg-emerald-100">
              <TabsTrigger value="all" activeTab={activeTab} onValueChange={setActiveTab}>Toutes</TabsTrigger>
              <TabsTrigger value="active" activeTab={activeTab} onValueChange={setActiveTab}>Actives</TabsTrigger>
              <TabsTrigger value="completed" activeTab={activeTab} onValueChange={setActiveTab}>Terminées</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto mt-8 p-4">
        <Card className="w-full shadow-xl bg-white bg-opacity-90 backdrop-blur-sm border-2 border-teal-300">
          <CardContent className="p-6">
            <div className="flex mb-4">
              <Input
                type="text"
                placeholder="Titre de la tâche"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-grow mr-2"
              />
              <Input
                type="text"
                placeholder="Description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                className="flex-grow mr-2"
              />

              <Select value={newTaskIcon} onValueChange={setNewTaskIcon}>
                <SelectTrigger className="flex items-center justify-center space-x-2 border p-2 rounded">
                  {/* Icône à gauche */}
                  {React.createElement(
                    iconOptions.find(option => option.value === newTaskIcon)?.icon || Plus,
                    { className: "w-6 h-6" }
                  )}
                  {/* Nom centré */}
                  <span className="ml-4 text-center flex-grow">{newTaskIcon}</span>
                </SelectTrigger>

                {/* Menu déroulant */}
                <SelectContent className="max-h-56 overflow-auto bg-white rounded shadow-lg">
                  {iconOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="flex items-center p-2 space-x-4 hover:bg-gray-100"
                    >
                      <div className="flex items-center w-full">
                        {React.createElement(option.icon, { className: "w-6 h-6 mr-2" })}
                        <span className="flex-grow text-center font-medium">{option.value}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={editingTask ? saveTaskEdit : addTask}
                className="ml-2 px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-700 transition-colors"
              >
                {editingTask ? 'Sauvegarder' : 'Ajouter'}
              </Button>
            </div>

            <div className="space-y-4">
              {filteredTasks.map(task => (
                <div key={task.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <button onClick={() => toggleComplete(task.id)} className="text-emerald-600 hover:text-emerald-800">
                      {task.completed ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
                    </button>
                    <div className="flex items-center ml-2">
                      {React.createElement(iconOptions.find(option => option.value === task.icon)?.icon || Plus, { className: 'w-6 h-6 mr-2' })}
                      <span className={`text-lg ${task.completed ? 'line-through text-gray-400' : ''}`}>
                        {task.title}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => {
                        setEditingTask(task);
                        setNewTaskTitle(task.title);
                        setNewTaskDescription(task.description);
                        setNewTaskIcon(task.icon);
                      }}
                      variant="outline"
                      className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                      <Edit2 />
                    </Button>
                    <Button
                      onClick={() => deleteTask(task.id)}
                      variant="destructive"
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

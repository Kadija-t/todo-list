

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
//require('dotenv').config({ path: '../vite-project/.env' });
const Task = require('./models/Task')


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuration MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Middleware pour vérifier la connexion à la base de données
app.use(async (req, res, next) => {
    try {
        req.db = await pool.getConnection();
        next();
    } catch (err) {
        console.error('Erreur de connexion à la base de données:', err);
        res.status(500).json({ message: 'Erreur de connexion à la base de données' });
    }
});

// Routes
app.get('/tasks', async (req, res) => {
    try {
        const [rows] = await req.db.query('SELECT * FROM tasks');
        res.json(rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des tasks:', error);
        res.status(500).json({ message: error.message });
    } finally {
        req.db.release();
    }
});

 app.post('/tasks', async (req, res) => {

try {
    const { title, description } = req.body;

    console.log(req.body)
    // Créer une nouvelle tâche avec Sequelize
    const newTask = await Task.create({ title, description });
    
    // Envoyer la tâche créée comme réponse
    res.status(201).json(newTask);
} catch (error) {
    console.error("Erreur lors de la création d'une tâche :", error);
    res.status(400).json({ message: error.message });
}
});

app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {title, description, completed } = req.body;

        await req.db.query(
            'UPDATE tasks SET completed = ?, title = ?, description = ? WHERE id = ?',   
            [completed, title, description, id]
        )
             
        const [updatedTask] = await req.db.query(
            'SELECT * FROM tasks WHERE id = ?',
            [id]
        );
        
        if (updatedTask.length === 0) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        
        res.json(updatedTask[0]);
    } catch (error) {
        console.error('Erreur lors de la mise à jour d\'une tâche:', error);
        res.status(400).json({ message: error.message });
    } finally {
        req.db.release();
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await req.db.query(
            'DELETE FROM tasks WHERE id = ?',
            [id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        
        res.status(204).send();
    } catch (error) {
        console.error('Erreur lors de la suppression d\'une tâche:', error);
        res.status(500).json({ message: error.message });
    } finally {
        req.db.release();
    }
});

// Gestion des erreurs globale
app.use((error, req, res, next) => {
    console.error('Erreur non gérée:', error);
    res.status(500).json({ message: 'Erreur serveur interne' });
});

// // Démarrage du serveur
// app.listen(PORT, () => {
//     console.log(`Serveur démarré sur le port ${PORT}`);
// });
// Démarrage du serveur
app.listen(5000, () => {
    console.log("Serveur démarré sur le port 5000");
  });
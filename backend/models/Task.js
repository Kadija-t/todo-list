// // models/Task.js
// import { DataTypes } from 'sequelize';
// import sequelize from '../config'; // Importer l'instance Sequelize

// const Task = sequelize.define('Task', {
//     id: {
//         type: DataTypes.INTEGER,   // Assurez-vous que le type correspond à celui de la base de données
//         autoIncrement: true,       // Auto-incrémenté
//         primaryKey: true,          // Clé primaire
//     },
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     description: {
//         type: DataTypes.TEXT,       // Utilisez TEXT si la description peut être longue
//         allowNull: true,            // Si la description est optionnelle
//     },
//     completed: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//     }
// }, {
//     tableName: 'tasks', // Assurez-vous que le nom de la table est correct
//     timestamps: false,   // Désactive les champs createdAt et updatedAt si non utilisés
// });

// export default Task; // Exporter le modèle

const {DataTypes} = require('sequelize');
const sequelize = require('../config.js');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    tableName: 'tasks',
    timestamps: false,
});

module.exports = Task;

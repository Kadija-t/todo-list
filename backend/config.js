const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config(); // Load environment variables

// Retrieve database information from the .env file
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

// Verify the connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection successful.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize; // Export the Sequelize instance for use elsewhere
const express = require('express')
const { databaseConnect } = require('./config/database.configs')
const { syncModels } = require('./models/index.models')
const serverConfig = require('./config/server.configs')
const routerConfig = require('./routes/index.routes')

const app = express()
require("dotenv").config();

// Server configuration
serverConfig(app)

// Database connection
databaseConnect()

// Models synchronization
syncModels()

// Router configuration
routerConfig(app)

module.exports = app

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

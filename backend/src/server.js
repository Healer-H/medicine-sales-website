const express = require('express')
const { databaseConnect } = require('./config/database.configs')
const serverConfig = require('./config/server.configs')
const routerConfig = require('./routes/index.routes')

const app = express()

// Server configuration
serverConfig(app)

// Database connection
databaseConnect()

// Models synchronization

// Router configuration
routerConfig(app)


module.exports = app

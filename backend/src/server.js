require('dotenv').config()
const express = require('express')
const { databaseConnect } = require('./config/databaseConfig')
const { syncModels } = require('./models/indexModel')
const serverConfig = require('./config/serverConfig')
const routerConfig = require('./routes/indexRoute')

const app = express()
const PORT = process.env.PORT || 3000

const serverStart = async() => {
    try {
        // Server configuration
        serverConfig(app)
        // Database connection
        await databaseConnect()
        // Models synchronization
        await syncModels()
        // Router configuration
        routerConfig(app)

        app.listen(PORT, () => { 
            console.log(`App is listening on http://localhost:${PORT}`)
            console.log(`API documentation is available at http://localhost:${PORT}/api-docs`)
        })
    }
    catch (err) {
        console.error('An error occurred while starting the server:', err)
    }
}

serverStart() 
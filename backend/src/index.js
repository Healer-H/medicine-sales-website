const EnvVars = require('./constants/envVars')
const server = require('./server')
const PORT = EnvVars.Port.toString()

// Start the server
server.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`)
    console.log(`API documentation is available at http://localhost:${PORT}/api-docs`)
})



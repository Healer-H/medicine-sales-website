const EnvVars = require('./constants/envVars')
const server = require('./server')
const PORT = EnvVars.Port.toString()
const HOST = EnvVars.Host

// Start the server
server.listen(PORT, () => {
  console.log(`App is listening on ${HOST}:${PORT}`)
  console.log(`API documentation is available at ${HOST}:${PORT}/api-docs`)
})

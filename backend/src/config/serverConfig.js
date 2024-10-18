const morgan = require('morgan')
const cors = require('cors')
const express = require('express')

const configServer = (app) => {
    // http logger
    app.use(morgan('combined'))

    // request body
    app.use(express.urlencoded({ extended: true })) //form data
    app.use(express.json())

    // cors middleware
    app.use(cors())
}

module.exports = configServer

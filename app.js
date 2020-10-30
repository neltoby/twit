require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors')
const getRoute = require('./server/routes/getRoute');
const postRoute = require('./server/routes/postRoute');
const deleteRoute = require('./server/routes/deleteRoute');

const app = express()

app.use(cors());

var corsOptions = {
  origin: process.env.NODE_ENV === 'development' ? 'http://localhost:1234' : 'https://twittee.netlify.app',
  optionsSuccessStatus: 200
}

const options = {
  definition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Twitee', // Title (required)
      description: 'Twitee api for posting twits for the world',
      version: '1.0.0', // Version (required)
    },
  },
  // Path to the API docs
  apis: [
    './server/routes/deleteRoute/index.js',
    './server/routes/getRoute/index.js',
    './server/routes/postRoute/index.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options)

const port = process.env.PORT || 8000

app.set('port', port)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/*', cors(corsOptions), getRoute)
app.post('/*', cors(corsOptions), postRoute)
app.delete('/*', cors(corsOptions), deleteRoute)

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = app
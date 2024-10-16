const errorHandler = require('./errorHandler.middleware');
const bodyParser = require('./bodyParser.middleware');

module.exports = {
  errorHandler,
  bodyParser,
};
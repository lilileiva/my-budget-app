const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors')
const routes = require('./routes/index.js');

require('./db.js');

//server initialize
const app = express();
app.name = 'API';
app.set( 'port', process.env.PORT || 3001);

//middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

//access control allow
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin: *');
  res.header('Access-Control-Allow-Credentials', 'true');  
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//routes
app.use('/', routes);

// Error catching endware.
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;

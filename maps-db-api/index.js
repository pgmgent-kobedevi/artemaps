const express = require('express');

// import env file, at start so everything can access it
require('dotenv').config();

const MongoClient = require('./db/MongoClient');
const { registerRoutes } = require('./routes');
const { registerMiddleware } = require('./middleware');

// connect with database
const db = new MongoClient();
db.connect();


const hostname = 'localhost';
const app = express();
const port = process.env.PORT || 80;

// register middleware
registerMiddleware(app);

// register routes
registerRoutes(app);

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const closeServer = () => {
    db.disconnect();
    process.exit();
}

process.on('SIGINT', () => closeServer());
process.on('SIGTERM', () => closeServer());
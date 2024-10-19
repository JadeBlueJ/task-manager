const http = require('http');
const express = require('express');
const crypto = require("crypto");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const HttpException = require('./utils/HttpException.utils');
const apiRoutes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

dotenv.config();

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Include PATCH method
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});
const server = http.createServer(app);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.get('/', (req, res) => {
  res.status(200).send('Success')
})

app.use('/v1/api', apiRoutes);

// 404 error
app.all('*', (req, res, next) => {
  const err = new HttpException(404, 'Endpoint Not Found');
  res.status(err.status).send(err.message);
});

const PORT = process.env.PORT || 8800;

server.listen(PORT, () => {
  console.log(`Backend server is running!`, PORT)
});

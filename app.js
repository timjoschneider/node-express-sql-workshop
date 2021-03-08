require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const morgan = require('morgan');

const usersRouter = require('./src/routes/users');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/pages/homepage.html'));
});

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

app.use((req, res, next) => {
  res.status(404);
  res.sendFile(path.join(__dirname, '/src/pages/404.html'));
});

module.exports = app;

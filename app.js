const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const sequelize = require('./database');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3000;

// Set up session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Use student and authentication routes
app.use('/', studentRoutes);
app.use('/auth', authRoutes);

// Sync with the database and start the server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});

app.use((req, res) => {
  res.status(404).send('404:This page could not be found');
});
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const sql = require('mssql');
const session = require('express-session');
const passport = require('./config/passport');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../cli/build')));

// Database configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Connect to the database
sql.connect(dbConfig).then(() => {
  console.log('Connected to the database');
}).catch(err => {
  console.error('Database connection failed:', err);
});

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Add these middleware after the existing middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Add these routes before the catch-all handler
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Catch-all handler for any request that doesn't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../cli/build/index.html'));
});

// Start the server
if (process.env.NODE_ENV === 'production') {
  const privateKey = fs.readFileSync('/path/to/private-key.pem', 'utf8');
  const certificate = fs.readFileSync('/path/to/certificate.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  https.createServer(credentials, app).listen(port, () => {
    console.log(`HTTPS Server running on port ${port}`);
  });
} else {
  app.listen(port, () => {
    console.log(`HTTP Server running on port ${port}`);
  });
}

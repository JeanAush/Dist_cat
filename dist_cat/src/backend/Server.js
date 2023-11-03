const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Esther13',
  database: 'dist_syst',
  connectionLimit: 10,
});

console.log('Connected to the MySQL database!');

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'aushjean@gmail.com',
    pass: 'avgg rqer rygl qazm',
  },
});

// Handle POST request for user registration
app.post('/api/register', (req, res) => {
  const{email, password, username}= req.body;

  pool.query('SELECT * FROM register WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error registering user' });
    } else if (results.length > 0) {
      res.status(409).json({ message: 'Email already registered' });
    } else {
      // Insert the new user
      pool.query('INSERT INTO register (email, password, username) VALUES (?, ?, ?)', [email, password, username], (insertErr, insertResults) => {
        if (insertErr) {
          console.error(insertErr);
          res.status(500).json({ message: 'Error registering user' });
        } else {
          res.status(201).json({ message: 'User registered successfully' });
        }
      });
    }
  });
});

app.post('/api/register', (req, res) => {
  const { email, phoneNumber, address, reg } = req.body;

  pool.query('SELECT * FROM register WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error saving profile' });
    } else if (results.length > 0) {
      res.status(409).json({ message: 'Profile already exists' });
    } else {
      // Insert the new profile
      pool.query('INSERT INTOregister (email, phoneNumber, address, reg) VALUES (?, ?, ?, ?)', [email, phoneNumber, address, reg], (insertErr, insertResults) => {
        if (insertErr) {
          console.error(insertErr);
          res.status(500).json({ message: 'Error saving profile' });
        } else {
          res.status(201).json({ message: 'Profile saved successfully' });
        }
      });
    }
  });
});
// Handle POST request for user login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  pool.query('SELECT * FROM register WHERE email = ?', [email], (err, results) => {
    if (err) {
      // Handle database error
      res.status(500).json({ message: 'Database error' });
    } else {
      if (results.length === 0) {
        // User not found
        res.status(401).json({ message: 'Invalid credentials' });
      } else {
        const user = results[0];

        if (user.password !== password) {
          // Password doesn't match
          res.status(401).json({ message: 'Invalid credentials' });
        } else {
          // Successful login
          res.status(200).json({ message: 'Login successful' });
        }
      }
    }
  });
});


// Handle POST request for password reset
app.post('/api/reset-password', (req, res) => {
  const { email } = req.body;

  // Generate a random password
  const newPassword = randomstring.generate(10);

  // Email content
  const mailOptions = {
    from: 'your-email@example.com',
    to: email,
    subject: 'Password Reset',
    text: `Your new password is: ${newPassword}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to send password reset email' });
    } else {
      console.log('Email sent: ' + info.response);

      // Update the user's password in the database (replace this with your own code)
      pool.query('UPDATE register SET password = ? WHERE email = ?', [newPassword, email], (err, updateResult) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Error updating password' });
        } else {
          res.status(200).json({ message: 'Password reset email sent successfully' });
        }
      });
    }
  });
});


const express = require('express');
const app = express();
app.use(express.json());

// Dummy database for storing user accounts
const users = {};

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (users[username]) {
    return res.status(400).json({ message: 'Username already exists. Please choose a different one.' });
  }

  users[username] = { password };
  return res.status(201).json({ message: 'Registration successful. You can now log in.' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!users[username] || users[username].password !== password) {
    return res.status(401).json({ message: 'Invalid credentials. Please try again.' });
  }

  return res.status(200).json({ message: `Login successful. Welcome, ${username}!` });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

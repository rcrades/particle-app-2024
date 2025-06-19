// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname)));

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to fetch defaults.json
app.get('/defaults.json', (req, res) => {
    fs.readFile(path.join(__dirname, 'defaults.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading defaults.json');
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
});

// Route to fetch user_preferences.json
app.get('/user_preferences.json', (req, res) => {
    fs.readFile(path.join(__dirname, 'user_preferences.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading user_preferences.json');
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
});

// Route to save user_preferences.json
app.put('/user_preferences.json', express.json(), (req, res) => {
    fs.writeFile(path.join(__dirname, 'user_preferences.json'), JSON.stringify(req.body, null, 2), 'utf8', (err) => {
        if (err) {
            res.status(500).send('Error saving user_preferences.json');
        } else {
            res.status(200).send('Preferences saved');
        }
    });
});

// Start the server when run directly
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app;

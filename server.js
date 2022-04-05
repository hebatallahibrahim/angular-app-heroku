//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./downloads/final-Project Angular/New folder (2)/E-commers-furniture_-ITI-Project'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: '/downloads/final-Project Angular/New folder (2)/E-commers-furniture_-ITI-Project/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
const indexPath = path.join(__dirname, './index.html')
const distPath = express.static(path.join(__dirname, './dist'))

app.use('/dist', distPath)
app.get('/', function (req, res) { res.sendFile(indexPath) }) 
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
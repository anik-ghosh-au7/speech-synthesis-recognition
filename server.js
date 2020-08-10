const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();
app.use(favicon(__dirname + '/public/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/app1', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'speech_recognition.html'));
});
app.get('/app2', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'speech_synthesis.html'));
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'app.html'));
});
app.listen(port);
// Add this to the VERY top of the first file loaded in your app
var apm = require('elastic-apm-node').start({
  // Set required app name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  appName: 'Client Service',
  // Use if APM Server requires a token
  secretToken: '',
  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: ''
})

var axios = require('axios');

// var stressPost = require('./stress.js');
var app = require('express')()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/test', function(req, res) {
  res.status(201).send('Posted something');
})

// any errors caught by Express can be logged by the agent as well
app.use(apm.middleware.express())

app.use(function(err, req, res, next) {
  if (err) {
    console.log('ERROR: ', err);
  }
})

app.listen(3000)
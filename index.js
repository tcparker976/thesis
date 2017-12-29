// Add this to the VERY top of the first file loaded in your app
var apm = require('elastic-apm-node').start({
  // Set required app name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  appName: 'Client Service',
  // Use if APM Server requires a token
  secretToken: '',
  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: ''
})

var sessionChecker = require('./db/sessionChecker.js');

var http = require('http');
var request = require('request');
var axios = require('axios');

/*
GET /booking/availability/:itemId/
POST /booking/:itemId/
GET /listings-experiences/results/:query/ <-- (I don't think this is necessary anymore) 
*GET /listings-experiences/search/:query/
*POST /listings-experiences/:update/:itemId/:userId
*/

var app = require('express')()

// any errors caught by Express can be logged by the agent as well
app.use(apm.middleware.express())

//gets a query from a user and sends it on to the bookings service
app.get('/booking/availability/:itemId', function (req, res) {
  let itemId = req.body.itemId;
  axios({
    method:'get',
    url:'URL for bookings service - Joe',
    params: {
      itemId: itemId
    }
  })
  .then(function(response) {
    res.status(response.status).send(response.body);
  })
  .catch(function(err) {
    console.log('AVAILABILITY ERROR: ', err);
  });
});

//posts a booking for a listing or experience
app.post('/booking/:itemId/', function (req, res) {
  let itemId = req.body.itemId;
  axios({
    method: 'post',
    url: 'URL for bookings service - Joe',
    data: {
      itemId: itemId
    }
  })
  .then(function(response) {
    res.status(response.status).send(response.body);
  })
  .catch(function(err) {
    console.log('BOOKING ERROR: ', err);
  });
});


// gets the results of a query from listings / experiences service
app.get('/listings-experiences/search/:query/', function (req, res) {
  let query = req.body.query;
  axios({
    method: 'get',
    url: 'URL for listings-experiences - Carter',
    params: {
      query: query
    }
  })
  .then(function(response) {
    res.status(response.status).send(response.body);
  })
  .catch(function(err) {
    console.log('SEARCH ERROR: ', err);
  });
});

// updates an existing lisiting or experience
app.post('/lisitngs-experiences/:update/:itemId/:userId/', function (req, res) {
  let update = req.body.update;
  let itemId = req.body.itemId;
  let userId = req.body.userId;
  axios({
    method: 'post',
    url: 'URL for listings-experiences - Carter',
    data: {
      update: update,
      itemId: itemId,
      userId: userId
    }
  })
  .then(function(response) {
    res.status(response.status).send(response.body);
  })
  .catch(function(err) {
    console.log('UPDATE ERROR: ', err);
  });
});

// test routes
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/test', function(req, res) {
  res.status(201).send('Posted something');
})

app.use(function(err, req, res, next) {
  if (err) {
    console.log('ERROR: ', err);
  }
})

app.listen(3000);

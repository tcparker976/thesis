var redis = require('redis');
var bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

var client = redis.createClient();

const randomSessionGenerator = function() {
  return Math.floor(Math.random() * 100000000000)
}

const randomServerAssigner = function() {
  var IpAddress = '172.16.254.';
  return IpAddress + Math.floor(Math.random() * (11));
}

const sessionChecker = function(sessionNum, userId, callback) {
  var sessionKey = 'session-' + sessionNum;
  if (!sessionNum) {
    sessionKey = 'session-' + randomSessionGenerator();
  }
  client.hmgetAsync(sessionKey, 'userId', 'serverIP')
  .then(function(res) {
    if (res[0] !== userId) {
      //create session data for that user
      //send request along to assigned server
      var currentServerIP = randomServerAssigner();
      redisClient.hmsetAsync('tools', 'session', sessionKey, 'userId', userId, 'serverIP', currentServerIP)
      .then(function(res) {
        console.log('SESSION FOR USER: ' + userId + ' STORED!');
        callback(res[1]);
      })
      .catch(function(err) {
        console.log('REDIS HMSET ERROR: ', err);
      })

    } else if (res[0] === userId) {
      callback(res[1]);
      //send request along to server assigned when session was saved
    }
    // console.log(res);
  })
  .catch(function(err) {
    console.log('ERROR: ', err);
  })
}

module.exports = sessionChecker;
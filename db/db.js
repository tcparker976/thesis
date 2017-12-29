// ================== USING REDIS-STREAM =========================

var redis = require('redis-stream')
var fs = require('fs');
var client = new redis(6379, '127.0.0.1');

var IpAddress = '172.16.254.';
var currentServerIP = '';
var userId = 9000002;
var session;

var dataGenerator = function() {
  // console.log(userId);
  var stream = client.stream();
  for(var record = 9000001; record <= 10000000; record++) {
    currentServerIP = IpAddress + Math.floor(Math.random() * (11));
    userId = userId + 1;
    // session = Math.floor(Math.random() * 1000000);
    session = record;
    var command = ['hmset', 'session-' + session, 'userId', userId, 'serverIP', currentServerIP];
    if(userId % 10000 === 0) { 
      console.log(userId);
    }
    stream.redis.write(redis.parse(command));
  }
  stream.on('close', function() {
    console.log('1000000 ROWS LOADED!!');
  });
  stream.end();
}

dataGenerator();

// ====== COMMAND TO GET SERVER IP ============

// redis-cli HSCAN session-[SESSION_NUM] 0

// ============== USING REDIS CLIENT =========================

// var redis = require('redis');
// var redisClient = redis.createClient({
//   host: 'localhost',
//   port: 6379
// });

// redisClient.on('ready', function() {
//   console.log('Redis is ready!');
//   databaseFiller();
// });

// redisClient.on('error', function() {
//   console.log('ERROR in Redis');
// });

// var databaseFiller = function() {
//   var IpAddress = "172.16.254.";
//   var currentServerIP = '';
//   var userId = 0;
//   var session;

//   for (var j = 0; j <= 10; j++) {
//     for (var i = 0; i <= 1000000; i++) {
//       currentServerIP = IpAddress + Math.floor(Math.random() * (11));
//       userId = userId + 1;
//       session = Math.floor(Math.random() * 1000000).toString();
//       console.log(userId);
//       redisClient.hmset("tools", "session", session, "userId", userId, "serverIP", currentServerIP,
//         function(err, reply) {
//           if (err) {
//             console.log("ERROR:", err);
//           } else {
//             console.log('ROW', reply);
//           }
//         });
//     }
//   }
// }



// ======== For storing a simple key: value pair ============

// redisClient.set("language", "nodejs", function(err, reply) {
//   console.log(err);
//   console.log(reply);
// });

// ======== For storing an Object (Hash) in one shot ======== 

// redisClient.hmset("tools", "webserver", "expressjs", "database", "mongoDB", "devops", "jenkins", function(err, reply) {
//   console.log(err);
//   console.log(reply);
// })

// redisClient.hgetall("tools", function(err, reply) {
//   if(err) {
//     console.log(err);
//   } 

//   console.log(reply);
// })

// ========= For storings List's and Set ====================

// redisClient.rpush(["langauges", "jenkins", "nodejs", "go"], function(err, reply) {
//   if(err) {
//     console.log(err);
//   }

//   console.log(reply);
// });

// redisClient.sadd(["devopstools", "jenkins", "codeship", "jenkins"], function(err, reply) {
//   if(err) {
//     console.log(err);
//   }

//   console.log(reply);
// })

// ========= Checking if keys exist ============================

// redisClient.exists('language', function(err, reply) {
//   if(!err) {
//     if(reply === 1) {
//       console.log("Key exists");
//     } else {
//       console.log("This key doesn't exist");
//     }
//   }
// });

// ========== Deleting a key =====================================

// redisClient.del('redisClient', function(err, reply) {
//   if(!err) {
//     if(reply === 1) {
//       console.log("Key is deleted");
//     } else {
//       console.log("This key doesn't exist");
//     }

//   }
// });

// ============= Timed delete/expiry for a key ===========================

// redisClient('redisClient', 30);

/* ======================================================================= */

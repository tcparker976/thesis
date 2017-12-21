var axios = require("axios");

var stressPost = function() {
  axios.post('http://localhost:3000/test', {
    session: 12345,
    userId: 'T_dawg96'
  })
  .then(function(response) {
    console.log(response);
    // setTimeout(() => {
      
    // }, 10);
    stressPost();
  })
  .catch(function(err) {
    console.log('ERROR POST: ', err);
  })
}

var stressGet = function() {
  axios.get('http://localhost:3000/', {
    session: 12345,
    userId: 'thomDuhBomb'
  })
  .then(function(response) {
    console.log(response)
    stressGet();
  })
  .catch(function(err) {
    console.log('ERROR GET: ', err);
  })
}

stressGet();
stressPost();

// var updateListsExps = function() {
//   var events['create', 'delete'];
//   var itemId = Math.floor(Math.random() * 100000);
//   var userId = Math.floor(Math.random() * 10000000);
//   var updateIndex = Math.floor(Math.random() * 2);
//   var session = userId;
//   var url = 'http://localhost:3000/listings-experiences/' + update[updateIndex] + '/' + itemId + '/' + userId;
//   axios.post(url, {
//     session: session,
//     userId: userId,
//   })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log('ERROR: ', err);
//   })

// }

// updateListsExps();

// for (var i = 0; i < 10; i++) {
//   // console.log('AND ANOTHER ONE!')
//   // setTimeout(() => { stressPost() }, 100);
//   stressPost();
// }
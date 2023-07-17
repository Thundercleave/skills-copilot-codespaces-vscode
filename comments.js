// Create web server application to handle comments

// Load modules
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

// Configure application
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Set up server
var port = 8080;
app.listen(port, function() {
  console.log('Server running on port ' + port);
});

// Add route for comments
app.post('/comments', function(req, res) {
  // Get comment from request body
  var comment = req.body.comment;
  // Write comment to file
  fs.appendFile('comments.txt', comment + '\n', function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Comment saved');
    }
  });
  // Send response to client
  res.send('Comment received');
});

// Add route for comments
app.get('/comments', function(req, res) {
  // Read comments from file
  fs.readFile('comments.txt', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      // Send comments to client
      res.send(data.toString());
    }
  });
});
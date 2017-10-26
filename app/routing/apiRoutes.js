// Add in mysql info
var mysql = require('mysql');

// Create connection (CHANGE TO YOUR CREDENTIALS)
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'friends_db',
  port: 3000
});

// Initiate MySQL Connection.
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  app.get('/api/friends', function(req, res) {
    connection.query('SELECT * FROM datalist', function(err, result) {
      if (err) throw err;

      res.json(result);
    });
  });

  app.post('/api/newfriend', function(req, res) {
    
    var friendData = req.body;

    console.log(friendData);

    connection.query('SELECT * FROM datalist', function(err, reservation) {
      if (err) throw err;
      

        connection.query("INSERT INTO datalist SET ?", friendData, function(error) {
          if (error) throw error;
          console.log("Friend added!");

          res.json(true);
        });
    });
  });
};
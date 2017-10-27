// Add in mysql info
var path = require("path");

var mysql = require('mysql');


// Create connection (CHANGE TO YOUR CREDENTIALS)
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'friends_db',
  port: 3306
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

  app.get('/api/friends', function(req, result) {

    connection.query('SELECT * FROM datalist', function(err, res) {
      if (err) throw err;
      result.json(res);
    });
  });

  app.post('/api/newfriend', function(req, res) {
    
    var friendData = req.body;

    connection.query('SELECT * FROM datalist', function(err, result) {
      if (err) throw err;
      
      var newScores = friendData.scores.split("");

      var mScoDiff = 50;
      var scoId = 0;
      var mId = 0;

      for (var i = 0; i < result.length; i++) {

        var currScore = result[i].scores;
        var csArr = currScore.split("");

        var curScoDiff = 0;

        for (var j = 0; j < csArr.length; j++) {
          var scoreDiff = Math.abs(parseInt(csArr[j]) - parseInt(newScores[j]));
          curScoDiff += scoreDiff;
        }//end for

        if (curScoDiff < mScoDiff) {
          mScoDiff = curScoDiff;
          mId = scoId;
        } // end if

        scoId ++;
      }//end for loop

      console.log("BFF "+result[mId].name);

      res.json(result[mId]);

      connection.query("INSERT INTO datalist SET ?", friendData, function(error) {
        if (error) throw error;

        console.log("Friend added!");

      });


    });
  });
};
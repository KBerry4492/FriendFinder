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

  app.get('/api/friends', function(req, res) {
    console.log("Ping");

    connection.query('SELECT * FROM datalist', function(err, res) {
      
      res.sendFile(path.join(__dirname, "../data/friends.js"));
      if (err) throw err;

      console.log(result);
    });
  });


  app.post('/api/newfriend', function(req, res) {
    
    var friendData = req.body;

    console.log("fD "+JSON.stringify(friendData));
    console.log("---")
    console.log(res.body);

    connection.query('SELECT * FROM datalist', function(err, res) {
      if (err) throw err;
      
      console.log("r2");
      console.log(res);

      var newScores = friendData.scores.split(",");
      console.log("newScores: "+newScores);

      var mScoDiff = 50;
      var scoId = 0;
      var mId = 0;

      for (var i = 0; i < res.length; i++) {

        var currScore = res[i].scores;
        var csArr = currScore.split("");
        console.log("CSR "+i+": "+csArr);

        var curScoDiff = 0;

        for (var j = 0; j < csArr.length; j++) {
          var scoreDiff = Math.abs(parseInt(csArr[j]) - parseInt(newScores[j]));
          curScoDiff += scoreDiff;
           console.log("SC "+ j + ": "+ scoreDiff);
        }
        console.log(curScoDiff);

        if (curScoDiff < mScoDiff) {
          mScoDiff = curScoDiff;
          mId = scoId;
        }
        console.log("ScoID: "+scoId);
        console.log("mID: "+mId);
        scoId ++;
      }

      console.log("BFF "+res[mId].name);

    connection.end();


        // connection.query("INSERT INTO datalist SET ?", friendData, function(error) {
        //   if (error) throw error;
        //   console.log("Friend added!");

        //   res.json(true);
        // });
    });
  });
};
var express = require('express');
var router = express.Router();
var pg = require('pg');

//adding database to server
var config = {
  database: 'antares', // name of your database
  host: 'localhost', // where is your database?
  port: 5432, // port for the database
  max: 10, // how many connections at one time?
  idleTimeoutMillis: 30000 // 30 second time out
};

var pool = new pg.Pool(config);
// Using a router drops the part of the url used to get here
// http://localhost:5000/books/ would '/'


router.get('/', function(req, res){
  // errorConnecting is bool, db is what we query against,
  // done is a function that we call when we're done
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'SELECT * FROM "koala";';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          var data = {koalas: result.rows};
          res.send(data);
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of GET


//to insert new koala to our database
router.post('/', function(req, res) {
  var newKoala = req.body;
  console.log(newKoala);
  // PASTED PG CODE
  // errorConnecting is bool, db is what we query against,
  // done is a function that we call when we're done
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      //query text is based off database assignments *test query in postico to make sure it works
      var queryText = 'INSERT INTO "koala" ("koala_name", "gender", "age", "ready_for_transfer", "notes")' +
                      ' VALUES ($1, $2, $3, $4, $5);';
      // errorMakingQuery is a bool, result is an object
      //db query MUST match object properties in client.js
      //db query MUST be in the same order as queryText
      db.query(queryText, [newKoala.koala_name, newKoala.gender, newKoala.age, newKoala.ready_for_transfer, newKoala.notes], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          console.log(errorMakingQuery);
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }); // end pool
});



module.exports = router;

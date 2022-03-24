const express = require('express');
const mysql = require('mysql');
const dbconfig   = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);

const app = express();

app.set('port', process.env.PORT || 3000);

// ROOT
app.get('/', (req, res) => {
  res.send('Root route');
});

// CREATE
app.post('/create-user', (req, res) => {
  const uid = req.body;
  console.log(uid);
  connection.query("INSERT INTO user (user_id) VALUES ('" + uid + "')", (error, rows) => {
    if (error) throw error;
    res.send("Insert " + uid + " success");
  });
});

// READ
app.get('/read-user', (req, res) => {
  const uid = req.query.uid;
  console.log(uid);
  connection.query("SELECT content, completed FROM todo WHERE user_id='" + uid + "'", (error, rows) => {
    if (error) throw error;
    // console.log('Todo List is: ', rows);
    res.send(rows);
  });
});

// UPDATE
/*
app.post('/update-todo', (req, res) => {
  const uid = req.body;
  console.log(uid);
  connection.query("INSERT INTO user (user_id) VALUES ('" + uid + "')", (error, rows) => {
    if (error) throw error;
    res.send("Insert " + uid + " success");
  });
});
*/

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);

const app = express();

app.use('/static', express.static(__dirname + '/resource'));
app.set('port', process.env.PORT || 3000);

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROOT
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/resource/index.html');
});

// CREATE
app.post('/create-user', (req, res) => {
	const uid = req.body.uid;
	console.log(uid);
	connection.query(
		"INSERT INTO user (user_id) VALUES ('" + uid + "')",
		(error, rows) => {
			if (error) throw error;
			res.send('Insert ' + uid + ' success');
		}
	);
});

// READ
app.get('/read-user', (req, res) => {
	const uid = req.query.uid;
	console.log(uid);
	connection.query(
		"SELECT content, completed FROM todo WHERE user_id='" + uid + "'",
		(error, rows) => {
			if (error) throw error;
			// console.log('Todo List is: ', rows);
			res.send(rows);
		}
	);
});

// CREATE TODO
app.post('/create-todo', (req, res) => {
	const uid = req.body.uid;
	const content = req.body.content;
	console.log(uid);
	connection.query(
		`INSERT INTO todo (user_id, content, completed) VALUES ("${uid}", "${content}", FALSE)`,
		(error, rows) => {
			if (error) throw error;
			res.send('Insert ' + content + ' success');
		}
	);
});

// UPDATE TODO
app.post('/update-todo', (req, res) => {
	const uid = req.body.uid;
	const content = req.body.content;
	const new_content = req.body.new_content;
	const completed = req.body.completed;
	console.log(uid);
	connection.query(
		`UPDATE todo SET content='${new_content}', completed=${completed} WHERE user_id='${uid}' AND content='${content}'`,
		(error, rows) => {
			if (error) throw error;
			res.send('Update ' + content + ' success');
		}
	);
});

app.listen(app.get('port'), () => {
	console.log('Express server listening on port ' + app.get('port'));
});

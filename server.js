var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
	res.send('hello world');
});

const PORT = 8080;
app.listen(PORT, () => {
	console.log(`Server is running at ${PORT}`);
});

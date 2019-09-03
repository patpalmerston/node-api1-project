// implement your API here
const express = require('express');

// import db folder
const db = require('./data/db');

const server = express();

server.get('/', (req, res) => {
	res.send('Hello from Express');
});

server.post('/api/users', (req, res) => {
	res.send();
});

server.get('/api/users', (req, res) => {
	// db.find() returns a promose and we need then and catch
	db.find()
		.then(users => {
			// .json will convert hte data passed to json
			// also tells the client we're sending JSON through and HTTP header
			res.status(200).json(users);
		})
		.catch(err => {
			res.status(500).json({ message: 'error getting users' });
		});
});

const port = 5000;
server.listen(port, () => console.log('server running'));

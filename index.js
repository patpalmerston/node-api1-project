// implement your API here
const express = require('express');

// import db folder
const data = require('./data/db');

const server = express();

server.use(express.json());

const port = 5000;
server.listen(port, () => console.log('server running'));

server.get('/', (req, res) => {
	res.send('Hello from Express');
});

// create user
server.post('/api/users', (req, res) => {
	const userData = req.body;
	console.log('userData', userData);
	data
		.insert(userData)
		.then(user => {
			res.status(201).json(user);
		})
		.catch(err => {
			res.status(500).json({ message: 'error adding user' });
		});
});

server.get('/api/users', (req, res) => {
	// db.find() returns a promose and we need then and catch
	data
		.find()
		.then(users => {
			// .json will convert hte data passed to json
			// also tells the client we're sending JSON through and HTTP header
			res.status(200).json(users);
		})
		.catch(err => {
			res.status(500).json({ message: 'error getting users' });
		});
});

// Delete a user
server.delete('/api/user/:id', (req, res) => {
	const userId = req.params.id;

	data
		.remove(userId)
		.then(user => {
			res.status(200).json({ message: 'user deleted' });
		})
		.catch(err => {
			res.status(500).json({ message: 'error removing user' });
		});
});

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
	if (!userData.name || !userData.bio) {
		res.status(400).json({ ERROR: 'Must add name and bio' });
		return;
	}
	data
		.insert(userData)
		.then(user => {
			res.status(201).json(user);
		})
		.catch(err => {
			res.status(500).json({
				ERROR: 'There was an error while saving the user to the database'
			});
			return;
		});
});

server.get('/api/users', (req, res) => {
	// db.find() returns a promise and we need then and catch
	data
		.find()
		.then(users => {
			// .json will convert hte data passed to json
			// also tells the client we're sending JSON through and HTTP header
			res.status(200).json(users);
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: 'The users information could not be retrieved.' });
		});
});

// Get user by Id
server.get('/api/users/:id', (req, res) => {
	const id = req.params.id;

	data
		.findById(id)
		.then(user => {
			if (user) {
				res.status(200).json({
					user
				});
			} else {
				res.status(404).json({
					message: 'The user with the specified ID does not exist.'
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				error: 'The user information could not be retrieved.'
			});
		});
});

// Delete a user
server.delete('/api/users/:id', (req, res) => {
	const userId = req.params.id;
	if (userId === 0) {
		res.status(404).json({ ERROR: 'User with this ID does not exist' });
	}

	data
		.remove(userId)
		.then(user => {
			res.status(200).json({ message: 'user deleted' });
		})
		.catch(err => {
			res.status(500).json({ ERROR: 'The user could not be removed' });
		});
});

// update a user

server.put('/api/users/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	if (!changes.name || !changes.bio) {
		res.status(400).json({ ERROR: 'Provide name and bio for user' });
	}

	data
		.update(id, changes)
		.then(updated => {
			if (updated === 0) {
				res.status(404).json({ ERROR: 'User with that ID does not exist' });
				return;
			}
		})
		.then(user => {
			res.status(201).json({ user });
		})
		.catch(err => {
			res
				.status(500)
				.json({ ERROR: 'The user information could not be modified.' });
		});
});

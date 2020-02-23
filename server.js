const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const database = {
    users: [
        {
            id: '123',
            name: 'Joel',
            email: 'joel@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Christine',
            email: 'christine@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
};

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', (req, res) => {
    const user = database.users.find(user => {
        return user.email === req.body.email && user.password === req.body.password;
    });
    user ? res.json(user) : res.status(400).json('error logging in');
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: database.length,
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    const user = getUser(id);
    user ? res.json(user) : res.status(404).json('no such user');
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    const user = getUser(id);
    if (user) {
      user.entries++;
      res.json(user.entries);
    } else {
        res.status(404).json('user not found');
    }
});

const getUser = (id) => {
    return database.users.find(user => {
        return user.id === id;
    });
};

app.listen(3000, () => {
    console.log('app is running on port 3000');
});
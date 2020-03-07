const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send('it is working!') });
app.post('/signin', signin.signInAuthentication(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db));
app.post('/profile/:id', (req, res) => profile.handleProfileUpdate(req, res, db));
app.put('/image', image.handleImage(db));
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res)});

app.listen(port = process.env.PORT || 3000, () => {
    console.log(`app is running on port ${port}`);
});
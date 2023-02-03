import express from 'express'; // Add {"type": "module"} to package.json for node18
import jwt, { verify } from 'jsonwebtoken';
import userRouter from './routes/api/users.js';
import venuesRouter from './routes/api/venues.js';

// const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRouter);
app.use('/api/venues', venuesRouter);

/////////////////

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json(
        { message: 'Posts created...', authData}
      )
    }
  })
})

app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    username: 'prasantip',
    email: 'prasanti.prusty@rapidfunnel.com'
  }

  jwt.sign({ user: user }, "secretkey", (err, token) => {
    res.json({
      token
    })
  })
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(403) //forbidden
  }
}
///////////////////

const server = app.listen(3000, () => {
  console.log('Server started on port 3000');
});

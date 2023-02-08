import express from 'express'; // Add {"type": "module"} to package.json for node18
import cors from 'cors';
import jwt, { verify } from 'jsonwebtoken';
import userRouter from './routes/api/users.js';
import venuesRouter from './routes/api/venues.js';
import 'dotenv/config'
import dbConnect from './src/database.js';
import users from './models/users.js';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import contacts from "./data/Contacts.js";

dbConnect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", (req, res, next) => {
  try {
    if (req.path == "/login" || req.path == "/register"
      || req.path == "/" || req.path == "/error" || req.path == "/contacts") {
      next();
    } else {
      verify(req.headers.authorization, 'secretkey', (err, authData) => {
        if (err) {
          console.log(err)
          return res.status(400).json({
            errorMessage: 'User unauthorized!',
            status: false
          })
        } else if (authData && authData.user) {
          req.user = authData;
          next();
        } else {
          console.log(authData)
          return res.status(401).json({
            errorMessage: 'User unauthorized!',
            status: false
          })
        }
      })
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    })
  }
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, process.env.STORY_FOLDER, 'test.txt');

app.get('/contacts', (req, res) => {
  const contactsDtls = contacts.map(o => ({ id: o.id, name: o.name, email: o.email }));
  res.json(contactsDtls);
});

app.get('/story', (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to open file.' });
    }
    res.status(200).json({ story: data.toString() });
  });
});

app.post('/story', (req, res) => {
  const newText = req.body.text;
  if (newText.trim().length === 0) {
    return res.status(422).json({ message: 'Text must not be empty!' });
  }
  fs.appendFile(filePath, newText + '\n', (err) => {
    if (err) {
      return res.status(500).json({ message: 'Storing the text failed.' });
    }
    res.status(201).json({ message: 'Text was stored!' });
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: `BACKEND - REACT_APP_NODE_SERVER : ${process.env.REACT_APP_NODE_SERVER} | process.env.API_SHOBIZ_SERVICE_SERVICE_HOST - ${process.env.API_SHOBIZ_SERVICE_SERVICE_HOST} | process.env.UI_SHOBIZ_SERVICE_SERVICE_HOST - ${process.env.UI_SHOBIZ_SERVICE_SERVICE_HOST} || Kubernetes Docker - Welcome to the Node JS API !!!`
  });
});


app.get('/error', (req, res) => {
  process.exit(1);
});

app.use('/api/users', userRouter);
app.use('/api/venues', venuesRouter);

app.post('/login', (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      users.find({ username: req.body.username }, (err, data) => {
        if (data.length > 0) {
          if (data[0].password, req.body.password) {
            checkUserAndGenerateToken(data[0], req, res);
          } else {
            res.status(400).json({
              errorMessage: 'Username or password is incorrect!',
              status: false
            });
          }
        } else {
          res.status(400).json({
            errorMessage: 'Username or password is incorrect!',
            status: false
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: 'Enter User Details!',
        status: false
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});

app.post('/register', (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      users.find({ username: req.body.username }, (err, data) => {
        if (data.length == 0) {
          let Users = new users({
            username: req.body.username,
            password: req.body.password,
          });
          Users.save((err, data) => {
            if (err) {
              res.status(400).json({
                errorMessage: err,
                status: false
              });
            } else {
              res.status(200).json({
                title: 'User Registered Successfully.',
                status: true
              });
            }
          });
        } else {
          res.status(400).json({
            errorMessage: `UserName ${req.body.username} Already Exist!`,
            status: false
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: 'Add user details!',
        status: false
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});

function checkUserAndGenerateToken(data, req, res) {
  // jwt.sign({ user: data.username, id: data._id }, "secretkey", { expiresIn: '1d' }, (err, token) => {
  jwt.sign({ user: data.username }, "secretkey",
    (err, token) => {
      if (err) {
        res.status(400).json({
          errorMessage: err,
          status: false
        });
      } else {
        res.json({
          message: 'Login Successfully',
          token: token,
          status: true
        })
      }
    })
}

const server = app.listen(process.env.PORT, () => {
  console.log('Server started on port ' + process.env.PORT);
});

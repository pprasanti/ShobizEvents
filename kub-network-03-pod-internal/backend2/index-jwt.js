import express from 'express'; // Add {"type": "module"} to package.json for node18
import cors from 'cors';
import 'dotenv/config.js'
import dbConnect from './src/database.js.js';
import bodyParser from 'body-parser';

dbConnect();

// const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getContacts', (req, res) => {
  axios.post(`http://${process.env.API_SHOBIZ_SERVICE_SERVICE_HOST}/contact`, {
  }).then((res) => {
    console.log(`BACKEND - REACT_APP_NODE_SERVER : ${process.env.REACT_APP_NODE_SERVER} | process.env.API_SHOBIZ_SERVICE_SERVICE_HOST - ${process.env.API_SHOBIZ_SERVICE_SERVICE_HOST} | process.env.UI_SHOBIZ_SERVICE_SERVICE_HOST - ${process.env.UI_SHOBIZ_SERVICE_SERVICE_HOST} || Kubernetes Docker - Welcome to the Node JS API !!!`)
    console.log(res)
  }).catch((err) => {
    if (err.response && err.response.data && err.response.data.errorMessage) {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    }
  });
  res.status(200).json({
    status: true,
    message: 'All contacts'
  })
});

app.listen(process.env.PORT, () => {
  console.log('Server started on port ' + process.env.PORT);
});

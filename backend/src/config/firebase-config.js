
import firebase from 'firebase-admin';
// const firebase = require("firebase-admin");
// path to service account
// import credentials from './credentials.json';
// let credentials = require("./credentials");

import fs from 'fs'
const credentials = JSON.parse(fs.readFileSync('src/config/ServiceAccount.json', 'utf-8'))

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
});

export default   firebase;


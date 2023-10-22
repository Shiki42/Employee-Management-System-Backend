/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {signup, signin, invite} = require('./handlers/auth');


const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.method, req.path, req.body);
  next();
});
app.post('/api/users/invite', invite);
app.post('/api/users/signup', signup);
app.post('/api/users/signin', signin);
app.listen(3050, () => {
  console.log('Example app listening on port 3050!');
},
);

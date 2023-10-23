/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {signup, signin, invite} = require('./handlers/auth');
const {createApplication, updateApplication,
  getApplicationsById, getApplicationsByUser} =
  require('./handlers/application');

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.method, req.path, req.body);
  next();
});
app.post('/api/user/invite', invite);
app.post('/api/user/signup', signup);
app.post('/api/user/signin', signin);

app.post('/api/application', createApplication);
app.put('/api/application/:id', updateApplication);
// app.post('/api/applications/:id/submit', submitApplication);
app.get('/api/application/:id', getApplicationsById);
app.get('/api/application', getApplicationsByUser);

app.listen(3050, () => {
  console.log('Example app listening on port 3050!');
},
);

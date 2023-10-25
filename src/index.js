/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {signup, signin, invite} = require('./handlers/auth');
const {createApplication, updateApplication,
  getApplicationsById, getApplicationsByUser} =
  require('./handlers/application');
const {createProfile, updateProfile} = require('./handlers/profile');
const {errorHandler} = require('./middlewares/error');

const documentRoutes = require('./routes/documentRoutes');

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

app.get('/api/application/:id', getApplicationsById);
app.get('/api/user/:username/application', getApplicationsByUser);
app.post('/api/application', createApplication);
app.put('/api/application/:id', updateApplication);

app.get('/api/user/:username/profile', getApplicationsByUser);
app.post('/api/profile', createProfile);
app.put('/api/profile', updateProfile);

app.use('/api/document', documentRoutes);

app.use(errorHandler);
app.listen(3050, () => {
  console.log('Example app listening on port 3050!');
},
);

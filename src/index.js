/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {signup, signin, invite} = require('./handlers/auth');
const {createProfile, updateProfile,
  getProfileByUser, getProfileByUserId, getProfileByAppId,
  getProfiles, searchProfiles} =
  require('./handlers/profile');

const {getEmployeesStatus, getProfileStatus} = require('./handlers/employee');
const {getEmployeesStatusOngoing,
  updateEmpolyeeStatus, sendNotification} = require('./handlers/HR');
const {errorHandler} = require('./middlewares/error');

const documentRoutes = require('./routes/documentRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.method, req.path, req.body);
  next();
});

// auth apis
app.post('/api/user/status', getProfileStatus);
app.post('/api/user/invite', invite);
app.post('/api/user/signup', signup);
app.post('/api/user/signin', signin);

// onboading application apis
app.get('/api/application/:id', getProfileByAppId);
app.post('/api/application', createProfile);
app.put('/api/application/:id', updateProfile);

// empolyee profile apis
app.get('/api/profiles/search', searchProfiles);
app.get('/api/profiles/', getProfiles);
app.get('/api/user/:id/profile', getProfileByUserId);

// app.post('/api/profile', createProfile);
app.put('/api/profile', updateProfile);

// HR apis
app.get('/api/users/visaStatus/ongoing', getEmployeesStatusOngoing);
app.put('/api/user/:id/visaStatus', updateEmpolyeeStatus);
app.post('/api/notification', sendNotification);

// document apis
app.use('/api/document', documentRoutes);
app.use(errorHandler);
app.listen(3050, () => {
  console.log('Example app listening on port 3050!');
},
);

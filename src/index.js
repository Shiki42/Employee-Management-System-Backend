/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {signup, signin, invite, getProfileStatus} = require('./handlers/auth');
const {createProfile, updateProfile,
  getProfileByUser, getProfileByUserId, getProfileByAppId,
  getProfiles, searchProfiles} =
  require('./handlers/profile');

const {getEmployeesStatusOngoing} = require('./handlers/employee');
const {errorHandler} = require('./middlewares/error');

const documentRoutes = require('./routes/documentRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.method, req.path, req.body);
  next();
});

app.post('/api/user/status', getProfileStatus);
app.post('/api/user/invite', invite);
app.post('/api/user/signup', signup);
app.post('/api/user/signin', signin);


app.get('/api/application/:id', getProfileByAppId);
app.post('/api/application', createProfile);
app.put('/api/application/:id', updateProfile);

app.get('/api/profiles/search', searchProfiles);
app.get('/api/profiles/', getProfiles);
app.get('/api/user/:id/profile', getProfileByUserId);
// app.get('/api/user/:username/profile', getProfileByUser);

app.post('/api/profile', createProfile);
app.put('/api/profile', updateProfile);

app.use('/api/document', documentRoutes);

app.get('/api/users/visaStatus/ongoing', getEmployeesStatusOngoing);
app.use(errorHandler);
app.listen(3050, () => {
  console.log('Example app listening on port 3050!');
},
);

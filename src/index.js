const express = require('express');
require('dotenv').config();
const {signup, signin, invite} = require('./handlers/auth');
const app = express();

app.use(express.json());
app.get('/', invite);

app.listen(3050, () => {
    console.log('Example app listening on port 3000!');
    }
);
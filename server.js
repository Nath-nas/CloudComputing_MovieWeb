const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname + "/react-movie-app", 'build')));

app.listen(3000);
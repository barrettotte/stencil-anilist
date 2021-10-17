'use strict';

// simple API to mock Anilist response.

const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

const host = '127.0.0.1';
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/', cors(), (req, res) => {
  console.dir(req.body);
  res.sendFile(path.resolve(__dirname, 'user-barrettotte.json'));
});

app.get('/user/:username', cors(), (req, res) => {
  const username = req.params.username;
  res.set('Content-Type', 'text/html');
  res.send(Buffer.from(`
    <h1 style="text-align: center">Anilist Mocked</h1><hr>
    <p>Actual page: <a href="https://anilist.co/user/${username}"/>${username}</a></p>
  `));
});

app.listen(port, () => console.log(`Server running at ${host}:${port}/`));

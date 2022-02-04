// ------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// ------------------------------------------------------------

const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const daprPort = process.env.DAPR_HTTP_PORT || 3500;
const daprUrl = `http://localhost:${daprPort}/v1.0`;
const port = 8082;
const pubsubName = 'pubsub';

app.post('/publish', (req, res) => {
  console.log("Publishing: ", req.body);
  const publishUrl = `${daprUrl}/publish/${pubsubName}/${req.body.messageType}`;
  
  request( { uri: publishUrl, method: 'POST', json: req.body } );

  res.sendStatus(200);
});

app.get('/dapr/subscribe', (req, res) => {
  res.send("[]");
});

// Serve static files
app.use(express.static(path.join(__dirname, 'client/build')));

// For all other requests, route to React client
app.get('*', function (_req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

console.log(`emads port: ${process.env.PORT}`)
app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}!`));
// ------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// ------------------------------------------------------------

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// Dapr publishes messages with the application/cloudevents+json content-type
app.use(bodyParser.json({ type: 'application/*+json' }));

const port = 3000;

app.get('/dapr/subscribe', (_req, res) => {
    res.json([
        {
            pubsubname: "pubsub",
            topic: "orders",
            route: "processOrders"
        },
        {
            pubsubname: "pubsub",
            topic: "invoices",
            route: "processInvoices"
        }
    ]);
});


app.post('/processOrders', (req, res) => {
    console.log("processOrders: ", req.body);
    res.sendStatus(200);
});

app.post('/processInvoices', (req, res) => {
    console.log("processInvoices: ", req.body);
    res.sendStatus(200);
});

app.post('/processComputerOrders', (req, res) => {
    console.log("processComputerOrders: ", req.body);
    res.sendStatus(200);
});

app.listen(port, () => console.log(`Node App listening on port ${port}!`));

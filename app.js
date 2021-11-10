const server = require('./server');
const express = require('express');

const client = require("@jsreport/nodejs-client")('http://localhost:5488', 'admin', 'password');
const jsrender = require('jsrender');

const myData = require('./data');

const app = express();
app.listen(3000, () => {
    console.log('App is listening on port 3000...');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/name', (req, res) => {
    var temp = jsrender.templates('Name: {{:name}}<br />');
    var html = temp.render({name: "Jim"});
    res.send(html);
});

app.get('/report', (req, res) => {
    client.render({
        template: {name: "temp1"},
        data: myData
    }).then((response) => {
        response.pipe(res);
    }).catch((err) => {
        res.send("Error: " + err);
    });
});
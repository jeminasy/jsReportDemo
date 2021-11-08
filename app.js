const server = require('./server');
const express = require('express');
// const jsreport = require('jsreport');

const jsreport = require('@jsreport/jsreport-core')();

// jsreport.use(require('@jsreport/jsreport-chrome-pdf')());
// jsreport.use(require('@jsreport/jsreport-handlebars')());

const app = express();
app.listen(3000, () => {
    console.log('App is listening on port 3000...');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// app.get('/report', (req, res) => {
//     jsreport.render({
//         template: {name: "temp1"}
//     }).then(out => {
//         out.stream.pipe(res);
//     }).catch(err => {
//         res.send("Error: " + err);
//     });
// });

app.get('/report', async (req, res) => {
    jsreport.init();
    jsreport.render({
        template: {shortid: "SywrNY7wf"}
    }).then(out => {
        out.stream.pipe(res);
    }).catch(err => {
        res.send('Error: ' + err);
    });
});

// app.get('/report', async (req, res) => {
//     const result = await jsreport.render({
//         template: {shortid: 'SywrNY7wf'}
//     });
//     res.send(result.content);
// });

// const proxy = require('jsreport-proxy');
// app.get('/report', (req, res, done) => {
//     proxy.render({
//         template: {shortid: "SywrNY7wf"}
//     }, function (err, res) {
//         done();
//     });
// })


#!/usr/bin/env node

var fs = require('fs');
var https = require('https');

var options = {
    hostname: 'localhost',
    port: 3000,
    path: '/user?id=User_Id&pwd=Password',
    method: 'GET',
    key: fs.readFileSync('client-key.pem'),
    cert: fs.readFileSync('client-crt.pem'),
    ca: fs.readFileSync('ca-crt.pem') };

var req = https.request(options, function(res) {
    res.on('data', function(data) {
        process.stdout.write(data);
    });
});

req.end();

req.on('error', function(e) {
    console.error(e);
});
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');


let app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    fs.appendFile('log.txt', `${req.url}\n`)
    next();
})

app.use(express.static(path.join(__dirname, '../public')));

app.post('/contact-form', (req, res, next) => {
    res.send(`Thank you for your submission to our system ${req.body.name}`)
    fs.appendFile("ContactList.json", `${req.body.name}: ${req.body.email}\n`)
    
    console.log(req.body.email);
    console.log(req.body.name);
    next();
})

app.get('/formsubmissions', (req, res, next) => {
    fs.readFile(path.join(__dirname, '../ContactList.json'), {
        encoding: "UTF-8"
    }, (err, data) => {
        res.send(data);
    })
})

app.listen(3000);
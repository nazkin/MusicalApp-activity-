const express = require('express');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect("mongodb://localhost:27017/music_collab", {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res)=> {
    res.json({
        message: 'Welcome to the home of this repository'
    })
});

app.post('/api/add', (req, res)=> {

    User.create({
        username: req.body.username,
        password: req.body.password
    },(err, usr)=> {
        if(!err){
            res.json('All has been added well');
        }else {
            res.json('J suis fked ');
        }
    })
});

app.post('/api/login', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password; 

    User.findOne({
        username
    }, (err, usr)=> {
        usr.verifyPassword(password)
            .then(valid=> {
                if(valid){
                    res.json('valid');
                }else {
                    res.json('invalid');
                }
            }).catch(err=> res.json(err));
    });
});

app.listen(port, ()=> {
    console.log(`Server started successfully. Connect at http://localhost:${port}`);
});
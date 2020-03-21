const express = require('express');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user');
const Account = require('./models/account');
const {verifyToken} = require('./middleware');

mongoose.connect("mongodb://localhost:27017/music_collab", {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());


app.get('/', (req, res)=> {
    res.json({
        message: 'Welcome to the home of this repository'
    })
});
//This route is responsible for signing up new users
app.post('/api/add', (req, res)=> {

    User.create({
        username: req.body.username,
        password: req.body.password
    },(err, usr)=> {
        if(!err){
            jwt.sign({user: usr.username}, 'secretkey', (err,token)=>{
                res.json({
                    token: token
                });
            });
        }else if(err.code == 11000) {
            res.json(`This username already exists in the database`);
        } else {
            res.json(`Error: ${error}`);
        }
    })
});
//This route is responsible for logging in new users
app.post('/api/login', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password; 

    User.findOne({
        username
    }, (err, usr)=> {
        usr.verifyPassword(password)
            .then(valid=> {
                if(valid){
                    //jwt.sign() send out the token during the log-in process just like you would for sign-up
                    jwt.sign({user: usr.username}, 'secretkey', (err, token)=> {
                        res.json({
                            token: token
                        });
                    });
                }else {
                    res.json('invalid');
                }
            }).catch(err=> res.json(err));
    });
});

//JWT protected route
app.get('/listings',verifyToken, (req,res)=> {
    jwt.verify(req.token, 'secretkey', (err, data)=> {
        if(err){
           res.sendStatus(403); 
        }else{
            res.json({
                message: `Welcome to the protected route, Success`,
                authData: data
            });
        }
    });

});




//Express routes that deal with personal information account
//*****Rertrieve the Account 
app.get('/api/findAccount/:email',verifyToken, (req,res)=> {
    const emailUser = req.params.email;
    jwt.verify(req.token, 'secretkey', (err, data)=> {
        if(err){
           res.sendStatus(403); 
        }else{
            Account.findOne({
                email: emailUser
            }).then(acc=> {
                res.json({
                  account: acc  
                });
            })
        }
    });

});
//*****Create the account/
app.post('/api/createAccount', (req,res)=> {
    const account = {
        email: req.body.email, 
        name: req.body.name,
        skills: req.body.skills,
        country: req.body.country, 
        city: req.body.city
    }

    Account.create(account)
        .then(val => {
            res.json(val);
            console.log('Successfully Added')
        }).catch(err=> console.log(err));
});

app.listen(port, ()=> {
    console.log(`Server started successfully. Connect at http://localhost:${port}`);
});
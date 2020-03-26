const express = require('express');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user');
const Account = require('./models/account');
const Song = require('./models/song');
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
        console.log(usr);
        if(!err){
            jwt.sign({id: usr._id, user: usr.username}, 'secretkey', (err,token)=>{
                Account.create({
                    username:  usr.username,
                    userId: usr._id
                    
                }).then(acc=> {
                    res.json({
                        token: token
                    });
                }).catch(err=> console.log(err));

            });
        }else {
            res.json(`Error: ${err.message}`);
        }
    });
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
                    jwt.sign({id: usr._id, user: usr.username}, 'secretkey', (err, token)=> {
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

//JWT protected route for simple authentication
app.get('/api/enter',verifyToken, (req,res)=> {
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

//Retrieve personal user data 
app.get('/api/find/:userId',verifyToken, (req,res)=> {
    const id = req.params.userId;
    jwt.verify(req.token, 'secretkey', (err, data)=> {
        if(err){
           res.sendStatus(403); 
        }else{
            User.findById(id)
            .then(usr => {
                res.json({
                    userData: usr
                });
            }).catch(err=> {
                console.log(err);
            });
        }
    });
});

//Update personal informatuion 
app.post('/api/update/:userId', (req,res)=> {
    const id = req.params.userId;
    const updateObj= {
        name: req.body.name,
        skills: req.body.skills,
        genre: req.body.genre
    }
 
    User.findByIdAndUpdate(id,updateObj)
    .then(result=> {
        res.json({
            message: 'Success, the update was successful',
            update: result
        });
    })
    .catch(err=> {console.log(err)});
});
//******Working With Songs********
app.get('/api/accountInfo/:id', (req,res)=> {
    Account.findOne({
        userId: req.params.id
       
    }).populate('songs').then(acc=> {
        res.json({
            msg: 'Account found',
            data: acc
        });
    })
    .catch(err=> res.json({
        msg: "ERROR",
        error: err
    }));
});

//Store the download URL after a song has been uploaded
app.post('/api/upload/song/:id', (req, res)=> {
    const uploadObj = {
        name: req.body.name,
        downloadURL: req.body.downloadURL,
        authorID: req.body.id
    }
    Account.findById(req.params.id)
        .then(accountObject=> {
            Song.create(uploadObj,(err, song)=>{
                if(!err){
                    accountObject.songs.push(song);
                    accountObject.save();
                    res.json({
                        msg: 'The song has been added successfully',
                    });
                }
            });
        }).catch(err => res.json({
            msg: "Error when uploading song"+ err.message,
            error: err
        }));
});



app.listen(port, ()=> {
    console.log(`Server started successfully. Connect at http://localhost:${port}`);
});
// import express application
const express = require("express");

// import body-paeser module
const bodyParser = require("body-parser");

// import bcrypt
const bcrypt = require("bcrypt");

// import axios
const axios = require("axios");

// import multer
const multer = require("multer");

// import path
const path = require("path");

// import jsonwebtoken module
const jwt = require('jsonwebtoken');

// import express-session module
const session = require('express-session');

// import mongoose module
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/test');

// -------------------------------------------------------------------------------------------------

// create express apllication
const app = express();

// ------------------------------------------------------------------------------------------------

// configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with , Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, PATCH, PUT"
    );
    next();
});

// 
app.use('/images', express.static(path.join('backend/images')));
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});

// Session Configuration
const secretKey = 'your-secret-key';
app.use(session({
secret: secretKey,
}));

// Data Base simulation
// let  matchesData = [
//     {id:1, teamOne:"EST",teamTwo:"CA", scoreOne: 1, scoreTwo: 1},
//     {id:2, teamOne:"ESS",teamTwo:"CSS", scoreOne: 3,scoreTwo: 1},
//     {id:3, teamOne:"FCB",teamTwo:"RMD", scoreOne: 4, scoreTwo: 2},
//     {id:4, teamOne:"CSS",teamTwo:"CA", scoreOne: 1, scoreTwo: 1},
//     {id:5, teamOne:"RMD",teamTwo:"CA", scoreOne: 1, scoreTwo: 1}
//    ];

// Models Importation
const Match = require("./models/match");
const User = require("./models/user");
const Team = require("./models/team");
const Player = require("./models/player");
const Stadium= require("./models/stadium");


// Business Logic: get all matches
app.get("/matches", (req, res) => {
    console.log("here into BL: get all matches");
    // res.json({ matches: matchesData}); 
    Match.find().then((docs) => {
        res.json({ matches: docs });
    });

});

// Business Logic:get match by id
app.get("/matches/:id", (req, res) => {
    console.log("here into BL: get match by id");
    // let matchId=req.params.id;
    // for (let i = 0; i < matchesData.length; i++) {
    //     if (matchesData[i].id== matchId) {
    //         res.json({match: matchesData[i]});
    //     }

    // }
    // let findedMatch= matchesData.find((obj)=>{
    //     return obj.id== matchId;
    // });
    // res.json({match:findedMatch});
    Match.findById(req.params.id).then((doc) => {
        res.json({ match: doc });
    });
});

// Business Logic:Add Match
app.post("/matches", (req, res) => {
    console.log("here into BL: Add Match");
    let obj = new Match(req.body);
    // console.log("here object from FE", obj);
    // matchesData.push(obj);
    obj.save();
    res.json({ msg: "added with succes" });
});

// Business Logic:Edit Match
app.put("/matches", (req, res) => {
    console.log("here into BL: Edit Match");
    let newMatch = req.body;
    // for (let i = 0; i < matchesData.length; i++) {
    //    if (matchesData[i].id == newMatch.id) {
    //     matchesData[i]=newMatch;
    //     break;
    //    } 
    // }
    Match.updateOne({ _id: req.body._id }, newMatch).then((updateResponse) => {
        console.log("here response after update", updateResponse);
        if (updateResponse.nModified == 1) {
            res.json({ isUpdated: true });
        } else {
            res.json({ isUpdated: false });
        }

    });

});

// Business Logic:Delete Match
app.delete("/matches/:id", (req, res) => {
    console.log("here into BL: Delete Match");
    let matchId = req.params.id;
    // for (let i = 0; i < matchesData.length; i++) {
    //     if (matchesData[i].id == matchId) {
    //         matchesData.splice(i,1);
    //         break;
    //     }   
    // }
    // res.json({ isDeleted: true });
    Match.deleteOne({ _id: matchId }).then((deleteResponse) => {
        console.log("here response after delete", deleteResponse);
        if (deleteResponse.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });
        }


    });
});
// 
// let  teamsData = [
//     {id:1,name:"EST", foundation:"wassim",stadium:"rades", owner:"salah"},
//     {id:2,name:"ESS", foundation:"ali",stadium:"manzah", owner:"Ali"},
//     {id:3,name:"FCB", foundation:"mohamed",stadium:"sousse", owner:"mohamed"},
//     {id:4,name:"CSS", foundation:"mohamed",stadium:"sfax", owner:"hichem"}
//    ];

// Business Logic: get all teams
app.get("/teams", (req, res) => {
    console.log("here into BL: get all teams");
    Team.find().then((docs) => {
        res.json({ teams: docs });
    });
});
// Business Logic:get team by id
app.get("/teams/:id", (req, res) => {
    console.log("here into BL: get team by id");
    Team.findById(req.params.id).then((doc) => {
        res.json({ team: doc });
    });

});

// Business Logic:Add team
app.post("/teams", (req, res) => {
    console.log("here into BL: Add team",req.body);
    let team = new Team(req.body);
    team.save((err,doc)=>{
        if (err) {
            res.json({ msg: "error" });
        } else {
            res.json({ msg: "added with succes" });
        }
    });
  
});

// Business Logic:Edit team
app.put("/teams", (req, res) => {
    console.log("here into BL: Edit team");
    let newTeam = req.body;
    Team.updateOne({ _id: req.body._id }, newTeam).then((updateResponse) => {
        console.log("here response after update", updateResponse);
        if (updateResponse.nModified == 1) {
            res.json({ isUpdated: true });
        } else {
            res.json({ isUpdated: false });
        }

    });
});

// Business Logic:Delete team
app.delete("/teams/:id", (req, res) => {
    console.log("here into BL: Delete team");
    let teamId = req.params.id;
    Team.deleteOne({ _id: teamId }).then((deleteResponse) => {
        console.log("here response after delete", deleteResponse);
        if (deleteResponse.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });
        }


    });
});

// Business Logic:get all teams informations
app.get("/teams/:teamId/info",(req,res)=>{
    console.log("here into BL: get all teams infos", req.params.teamId);
    Team.findOne({_id: req.params.teamId}).populate("players").then((docs)=>{
        console.log("here teams",docs);
        res.json({x: docs});
    });
});
// --------------------------------------------------------------------------------------------------
// Business Logic:Login
app.post("/users/login", (req, res) => {
    console.log("here into BL: Login", req.body);
    //     User.findOne({email: req.body.email, password : req.body.password}).then((doc)=>{
    //        console.log("here doc");
    //         if (doc) {
    //             res.json({msg:true});
    //         } else {
    //             res.json({msg:false});
    //         }
    //     });   

    // });
    let result;
    User.findOne({ email: req.body.email })
        .then((doc) => {
            console.log("here finded User by email", doc);
            if (!doc) {
                return res.json({ msg: "please check your email" });
            }
            else {
                result = doc;
                bcrypt.compare(req.body.password, doc.password).then((pwdCompare) => {
                    console.log("here pwdCompare", pwdCompare);
                    if (pwdCompare) {
                        const token = jwt.sign({ 
                            firstName: result.firstName,
                            lastName: result.lastName, 
                            id: result._id,
                            role:result.role 
                        }, 
                            secretKey, { expiresIn:'1h' });
                        res.json({
                            msg: "welcome",
                            token: token
                        });
                    } else {
                        res.json({ msg: "please check your pwd" });
                    }
                }
        )};
            
        });
});



// Business Logic:Signup
app.post("/users/signup", multer({ storage: storageConfig }).single("img"), (req, res) => {
    console.log("here into BL: Signup", req.body);
    User.findOne({ email: req.body.email }).then((doc) => {
        if (doc) {
            res.json({ msg: "oops,email exists" });

        } else {
            bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
                console.log("here crypted pwd", cryptedPwd);
                req.body.password = cryptedPwd;
                req.body.avatar = `http://localhost:3000/images/${req.file.filename}`;
                let user = new User(req.body);
                user.save((err, doc) => {
                    if (err) {
                        res.json({ msg: "failed" });
                    } else {
                        res.json({ msg: "added with succes" });
                    }
                });
            });
        }
    })
});

// Business Logic: get all users
app.get("/users", (req, res) => {
    console.log("here into BL: get all users");
    User.find().then((users) => {
        res.json({ users: users });
    });

});
// -------------------------------------------------------------------------------------------------------

// Business Logic: get all players
app.get("/players", (req, res) => {
    console.log("here into BL: get all players");
    Player.find().then((docs) => {
        res.json({ players: docs });
    });
});

// Business Logic:get player by id
app.get("/players/:id", (req, res) => {
    console.log("here into BL: get player by id");
    // let playerId=req.params.id;
    // for (let i = 0; i < playersTab.length; i++) {
    //     if (playersTab[i].id== playerId) {
    //         res.json({player: playersTab[i]});
    //     }

    // }
    // let findedplayer= playersTab.find((obj)=>{
    //     return obj.id== playerId;
    // });
    // res.json({player:findedplayer});
    Player.findById(req.params.id).then((doc) => {
        res.json({ player: doc });
    });
});
// Business Logic:Add player
app.post("/players", (req, res) => {
    console.log("here into BL: Add player",req.body);
    Team.findById(req.body.idTeam).then((team)=>{
        if (!team) {
            return res.json({message:"team not found"});
        }
        const player = new Player({
            position:req.body.position,
            name: req.body.name,
            number: req.body.number,
            age: req.body.age,
            team: team._id,
            });

        player.save((err, doc) => {
                team.players.push(player);
                team.save();
                res.json({msg:"player added with success"});
                });
                });
    })
    // let obj= req.body;
    // console.log("here object from FE", obj);
    // playersTab.push(obj);
    // res.json({msg :"added with succes"});
    // let obj = new Player(req.body);
    // obj.save();
    // res.json({ msg: "added with succes" });

// Business Logic:Edit player
app.put("/players", (req, res) => {
    console.log("here into BL: Edit player");
    // let newPlayer= req.body;
    // for (let i = 0; i < playersTab.length; i++) {
    //    if (playersTab[i].id == newPlayer.id) {
    //     playersTab[i]=newPlayer;
    //     break;
    //    } 
    // }
    // res.json({msg:"edited with succes"});
    let newPlayer = req.body;
    Player.updateOne({ _id: req.body._id }, newPlayer).then((updateResponse) => {
        console.log("here response after update", updateResponse);
        if (updateResponse.nModified == 1) {
            res.json({ isUpdated: true });
        } else {
            res.json({ isUpdated: false });
        }

    });
});

// Business Logic:Delete Player
app.delete("/players/:id", (req, res) => {
    console.log("here into BL: Delete player");
    // let playerId=req.params.id;
    // for (let i = 0; i < playersTab.length; i++) {
    //     if (playersTab[i].id == playerId) {
    //         playersTab.splice(i,1);
    //         break;
    //     }   
    // }
    // res.json({ isDeleted: true });
    let playerId = req.params.id;
    Player.deleteOne({ _id: playerId }).then((deleteResponse) => {
        console.log("here response after delete", deleteResponse);
        if (deleteResponse.deletedCount == 1) {
            res.json({ isDeleted: true });
        } else {
            res.json({ isDeleted: false });
        }


    });
});

// --------------------------------------------------------------------------------------------------

app.post("/weather", (req, res) => {
    console.log("here into BL: weather", req.body);
    let key = "0e0e6559a16364c9e4c74ccc48ccd82b";
    // let apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${key}`;
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${key}`;
    axios.get(apiURL).then((response) => {
        console.log("here API response", response.data);
        let weatherToSend = {
            temperature: response.data.main.temp,
            pressure: response.data.main.pressure,
            humidity: response.data.main.humidity,
            speed: response.data.wind.speed,
            icone: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        }
        res.json({ result: weatherToSend });
    });

});

// businesslogic: Add Stadium
app.post("/stadia",(req,res)=>{
    console.log("here into BL: Add Stadium", req.body);
    
})
// ------------------------------------------------------------------------------------------------

// make app importable from another files
module.exports = app;
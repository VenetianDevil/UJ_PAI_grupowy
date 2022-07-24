'use strict';

const express = require('express')
const router = express.Router()
const userDao = require('../dao/userDao')
const jwtService = require('../services/jwtService')
const userService = require('../services/userService')
require('dotenv').config({ path: 'config/.env'})

const{onClientError, onServerError} = require("./errorHandler");


router.use(express.json())

router.get('/user/:userID', (req, res) => {
    let userID = req.params.userID
    userDao.getUserTypeData(userID).then(user_r => {
        if(user_r.success){
            res.status(200).json(user_r.user);
        }
        else{
            onClientError(res, user_r.status_code, user_r.message);
        }
    }).catch(err => onServerError(res, err));
});



router.put("/user", (req, res) => {

    userDao.updateUser(req.body).then(token_r=>{
        if(token_r.success){
            res.status(200).json({
                "token": token_r.token,
                "user_data": token_r.user
            });
        }
        else{
            onClientError(res, token_r.status_code, token_r.message);
        }
    }).catch(err => onServerError(res, err));
});



module.exports = router;
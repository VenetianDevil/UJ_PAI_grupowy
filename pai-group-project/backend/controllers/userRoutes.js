'use strict';

const express = require('express')
const router = express.Router()
const userDao = require('../dao/userDao')

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

    userDao.updateUser(req.body).then(user_r=>{
        if(user_r.success){
            res.status(201).json({
                "user_data": user_r.user
            });
        }
        else{
            onClientError(res, user_r.status_code, user_r.message);
        }
    }).catch(err => onServerError(res, err));
});



module.exports = router;
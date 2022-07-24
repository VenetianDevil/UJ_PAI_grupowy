'use strict';

const{onClientError} = require("../controllers/errorHandler");


const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'config/.env'})

/*
Dodałem basic auth jako drugą metodę autentyfikacji (fallback).
Głównie do testowania api
*/
const userService = require("./userService");

async function verifyBasicAuth(req){
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const strauth = Buffer.from(b64auth, 'base64').toString();

    if(strauth==null || strauth=="")return false;
    const splitIndex = strauth.indexOf(':');

    const login = strauth.substring(0, splitIndex);
    const password = strauth.substring(splitIndex + 1);

    const user = await userService.authenticateAndGetUser(login, password);
    if(user==null) return false;

    req.user_id = user.id;
    req.user_login = user.username;
    return true;
}


function mVerifyToken(req, res, next) {

    /*function n1(){
        if(admin_perm_required && !req.user_admin){
            onClientError(res, 403, "Only admin user can do this.");
        }
        else{
            next();
        }
    }*/
    
    
    const authHeader = req.headers['authorization']
    if(typeof authHeader !== 'undefined') {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if(err) {

                verifyBasicAuth(req).then(a => {
                    if(a){
                        next();
                    }
                    else{
                        onClientError(res, 403, "Incorrect authentication.");
                    }
                });

            } else {
                req.user_login = data.username;
                req.user_id = data.id;
                next();
            }
        })
    } else {
        onClientError(res, 401, "Authentication required.");
    }
}

function verifyToken(req, res, next){
    mVerifyToken(req, res, next, false);
}

function generateToken(user) {
    const {username, id, admin} = user
    return jwt.sign({username, id, admin}, process.env.JWT_SECRET)
}

async function login(json_data){
    
    if(!json_data.hasOwnProperty("login")){
        return {
            "success": false,
            "status_code": 400,
            "message": "'login' field required."
        }
    }
    if(!json_data.hasOwnProperty("password")){
        return {
            "success": false,
            "status_code": 400,
            "message": "'password' field required."
        }
    }
    let user = await userService.authenticateAndGetUser(json_data.login, json_data.password);
    if(user==null){
        return {
            "success": false,
            "status_code": 403,
            "message":"Incorrect login or password."
        }
    }
    else{
        return {
            "success": true,
            "token": generateToken(user),
            "user_data": userService.getUserData(user)
        }
    }
}

module.exports = {
    verifyToken,
    generateToken,
    login
}
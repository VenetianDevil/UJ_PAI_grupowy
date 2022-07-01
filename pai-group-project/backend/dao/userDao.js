'use strict';

const bcrypt = require('bcrypt');
const User = require("../models/User");
const UserProfileDao = require("./UserProfileDao");
const CompanyProfileDao = require("./CompanyProfileDao");
const UserProfile = require("../models/UserProfile");
const CompanyProfile = require("../models/CompanyProfile");

async function getAllUsers() {
    return await User.findAll();
}

async function getUserById(user_id) {

    let user = await User.findByPk(user_id);
    if(user==null){
        return {
            "success":false,
            "status_code":404,
            "message": `User with id ${user_id} not found.`
        }
    }
    else{
        return {
            "success":true,
            "user": user
        }
    }
}

async function getUserByUsername(login) {
    return await User.findOne({
        where: {login: login}
    })
}

async function getUserByUsernameAndPassword(login, password) {
    return await User.findOne({
        where: {login: login, password: password}
    })
}

async function deleteUserById(user_id) {

    let user_r = await getUserById(user_id);
    if(!user_r.success)return user_r;

    await User.destroy({
        where: {
            id: user_id
        }
    });

    await UserProfile.destroy({
        where: {
            userID: user_id
        }
    })

    await CompanyProfile.destroy({
        where: {
            companyID: user_id
        }
    })

    return {
        "success": true
    }
}

async function isLoginTaken(username) {
    const user = await getUserByUsername(username)
    return user != null;

}


async function mParseJson(json_in){
    const required_fields = ["password", "login", "type"]
    for(let f of required_fields){
        if(!json_in.hasOwnProperty(f)){
            return {
                "success":false,
                "status_code": 400,
                "message": `User data must have a string field '${f}'`
            }
        }
    }

    if(json_in.login.length < 3){
        return {
            "success":false,
            "status_code":400,
            "message": "Too short login."
        }
    }

    if(json_in.password < 4){
        return {
            "success":false,
            "status_code":400,
            "message": "Too short password."
        }
    }
    else if(await isLoginTaken(json_in.login)){
        return {
            "success":false,
            "status_code":409,
            "message": `The login '${json_in.login}' is already taken.`
        }
    }

    let user = User.build({
        "login" : json_in.login,
        "password": await bcrypt.hash(json_in.password, 10),
        "type": json_in.type,
        "email":json_in.email});

    return {
        "success":true,
        "user":user,
    }
}

async function createUser(json_in){
    let user_r = await mParseJson(json_in);
    if(user_r.success){
        user_r.user = user_r.user.save();
    }
    else{
        return user_r;
    }
    user_r = await User.findOne({
        order: [
            ['createdAt', 'DESC']
        ],
    });

    json_in.id = user_r.id;
    let user_p;
    if (json_in.type === 1){
        user_p = await UserProfileDao.mParseJsonUser(json_in);
    }
    else {
        user_p = await CompanyProfileDao.mParseJsonCompany(json_in);
    }

    if(user_p.success){
        user_p.user = user_p.user.save();
    }
    return user_p;
}

async function updateUser(user_id, json_in){
    let user_r = await mParseJson(json_in);
    let user_p;
    json_in.id = user_id;
    if (user_r.type === 1){
        user_p = UserProfileDao.mParseJsonUser(json_in);
    }
    else{
        user_p = CompanyProfileDao.mParseJsonCompany(json_in);
    }

    if(!user_r.success)return user_r;

    user_r.user.id = user_id;
    user_r.status_code = 201;

    let previous_user_r = await getUserById(user_id);
    if(previous_user_r.success){
        user_r.status_code = 200;

        let previous_user = previous_user_r.user;
        user_r.user.createdAt = previous_user.createdAt;
        
        await deleteUserById(user_id);
    }

    user_r.user = await user_r.user.save();
    user_p.user = await  user_p.user.save();
    return user_p;
}

module.exports = {
    getAllUsers, getUserById, getUserByUsername, deleteUserById, updateUser, createUser, getUserByUsernameAndPassword
}
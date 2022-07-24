'use strict';

const UserProfile = require("../models/UserProfile");
const CompanyProfile = require("../models/CompanyProfile");
const User = require("../models/User");

async function getUserByEmail(email) {
    return await UserProfile.findOne({
        where: {email:email}
    })
}

async function getUserByID(userID) {
    return await UserProfile.findByPk(userID)
}

async function isEmailTaken(email) {
    const user = await getUserByEmail(email)
    return user != null;

}

function isEmailValid(email) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return !!email.match(validRegex);

}

async function updateUserProfileById(id, json_in) {
    console.log(id)
    console.log("jestem tu")
    let user = await UserProfile.update(json_in,
        {
            where: {
                userID: id
            }
        });
    if(user==null){
        return {
            "success":false,
            "status_code":404,
            "message": `User Profile with id ${id} not found.`
        }
    }
    else{
        return {
            "success":true,
            "user": user
        }
    }
}
async function mParseJsonUser(json_in){

    console.log(json_in)
    if(json_in.hasOwnProperty("email") && await isEmailTaken(json_in.email)){
        return {
            "success":false,
            "status_code":409,
            "message": `The email '${json_in.email}' is already taken.`
        }
    }

    if(json_in.hasOwnProperty("email") && !isEmailValid(json_in.email)){
        return {
            "success":false,
            "status_code": 400,
            "message": `Incorrect email address: ${json_in.email}`
        }
    }
    let user = UserProfile.build({
        "userID":json_in.id,
        "email":json_in.email,
        "givenName":json_in.givenName,
        "familyName":json_in.familyName,
        "phoneNumber":json_in.phoneNumber,
        "imageURL":json_in.imageURL,
        "info":json_in.info,
        "linkedIn":json_in.linkedIn,
        "gitHub":json_in.gitHub,
        "instagram":json_in.instagram,
        "portfolioURL":json_in.portfolioURL,
        "cvURL":json_in.cvURL});

    return {
        "success":true,
        "user":user
    }
}

module.exports = {
    mParseJsonUser, updateUserProfileById, getUserByID
}
'use strict';

const UserProfile = require("../models/UserProfile");

async function getUserByEmail(email) {
    return await UserProfile.findOne({
        where: {email}
    })
}

async function isEmailTaken(email) {
    const user = await getUserByEmail(email)
    return user != null;

}

function isEmailValid(email) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return !!email.match(validRegex);

}

async function mParseJsonUser(json_in){
    const required_fields = ["email"]
    for(let f of required_fields){
        if(!json_in.hasOwnProperty(f)){
            return {
                "success":false,
                "status_code": 400,
                "message": `User data must have a string field '${f}'`
            }
        }
    }

    if(await isEmailTaken(json_in.email)){
        return {
            "success":false,
            "status_code":409,
            "message": `The email '${json_in.email}' is already taken.`
        }
    }


    if(!isEmailValid(json_in.email)){
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
    mParseJsonUser,
}
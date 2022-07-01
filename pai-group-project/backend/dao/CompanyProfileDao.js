'use strict';

const CompanyProfile = require("../models/CompanyProfile");

async function getUserByEmail(email) {
    return await CompanyProfile.findOne({
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

async function mParseJsonCompany(json_in){
    /*const required_fields = ["email"]
    for(let f of required_fields){
        if(!json_in.hasOwnProperty(f)){
            return {
                "success":false,
                "status_code": 400,
                "message": `User data must have a string field '${f}'`
            }
        }
    }*/

    if(await isEmailTaken(json_in.email) || json_in.hasOwnProperty("email")){
        return {
            "success":false,
            "status_code":409,
            "message": `The email '${json_in.email}' is already taken.`
        }
    }

    if(!isEmailValid(json_in.email) || json_in.hasOwnProperty("email")){
        return {
            "success":false,
            "status_code": 400,
            "message": `Incorrect email address: ${json_in.email}`
        }
    }
    let user = CompanyProfile.build({
        "companyID":json_in.id,
        "email":json_in.email,
        "companyName":json_in.companyName,
        "HQLocation":json_in.HQLocation,
        "imageURL":json_in.imageURL,
        "info":json_in.info,
        "linkedIn":json_in.linkedIn,
        "instagram":json_in.instagram,
        "companyURL":json_in.companyURL});

    return {
        "success":true,
        "user":user
    }
}

module.exports = {
    mParseJsonCompany: mParseJsonCompany,
}
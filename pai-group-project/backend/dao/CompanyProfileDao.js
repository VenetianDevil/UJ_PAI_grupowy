'use strict';

const CompanyProfile = require("../models/CompanyProfile");
const {Sequelize, QueryTypes} = require("sequelize");
const JobOffer = require("../models/JobOffer");
const UserProfile = require("../models/UserProfile");
const sequelize = require("../config/database");

async function getUserByEmail(email) {
    return await CompanyProfile.findOne({
        where: {email}
    })
}

async function getCompanyByID(companyID) {
    return await CompanyProfile.findByPk(companyID)
}

async function isEmailTaken(email) {
    const user = await getUserByEmail(email)
    return user != null;

}

function isEmailValid(email) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return !!email.match(validRegex);

}
async function getBestCompanies() {
    let companies = await CompanyProfile.findAll({ order: Sequelize.literal('random()'), limit: 5 })
    if(companies==null){
        return {
            "success":false,
            "status_code":404,
            "message":`Offers not found`
        }
    }

    return {
        "success": true,
        "offer": companies
    }

}

async function getAllCompanies() {
    return {"companies": await CompanyProfile.findAll()};
}

async function getCompanyOffers(companyID) {

    let companyOffers = await sequelize.query( "SELECT * FROM JobOffers AS OFFERS JOIN CompanyProfiles AS COMP ON OFFERS.companyID = COMP.companyID " +
        "WHERE OFFERS.companyID = :companyID",
        {
            replacements: { companyID: companyID },
            type: QueryTypes.SELECT
        })
    if(companyOffers==null){
        return {
            "success":false,
            "status_code":404,
            "message":`Offers not found`
        }
    }

    return {
        "success": true,
        "offer": companyOffers
    }

}

async function updateCompanyProfileById(id, json_in) {
    let user = await CompanyProfile.update(json_in,
        {
            where: {
                companyID: id
            }
        });
    if(user==null){
        return {
            "success":false,
            "status_code":404,
            "message": `Company Profile with id ${id} not found.`
        }
    }
    else{
        return {
            "success":true,
            "user": user
        }
    }
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

    if(json_in.hasOwnProperty("email") && await isEmailTaken(json_in.email)){
        return {
            "success":false,
            "status_code":409,
            "message": `The email '${json_in.email}' is already taken.`
        }
    }

    if(json_in.hasOwnProperty("email") && !isEmailValid(json_in.email) ){
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
        "companyInfo":json_in.info,
        "linkedIn":json_in.linkedIn,
        "instagram":json_in.instagram,
        "companyURL":json_in.companyURL});

    return {
        "success":true,
        "user":user
    }
}

module.exports = {
    mParseJsonCompany, getBestCompanies, getAllCompanies, getCompanyOffers, updateCompanyProfileById, getCompanyByID
}
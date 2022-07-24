'use strict';

const recruitments = require("../models/Recruitments");
const JobOffer = require("../models/JobOffer");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const UserProfileDao = require("./UserProfileDao");
const CompanyProfileDao = require("./CompanyProfileDao");
const {QueryTypes} = require("sequelize");
const UserProfile = require("../models/UserProfile");
const CompanyProfile = require("../models/CompanyProfile");
const sequelize = require("../config/database")


async function mParseJson(json_in){
    const required_fields = ["offerID", "userID"]
    for(let f of required_fields){
        if(!json_in.hasOwnProperty(f)){
            return {
                "success":false,
                "status_code": 400,
                "message": `Recruitment data must have a string field '${f}'`
            }
        }
    }
    if(!json_in.hasOwnProperty("status")){
        json_in.status = 0
    }
    if(!json_in.hasOwnProperty("stage")){
        json_in.stage = 0
    }
    let recruitment = recruitments.build({
        "offerID" : json_in.offerID,
        "userID": json_in.userID,
        "status": json_in.status,
        "stage": json_in.stage});

    return {
        "success":true,
        "recruitment":recruitment,
    }
}

async function getRecruitmentById(id) {
    let recruitment = await recruitments.findByPk(id);
    if(recruitment==null){
        return {
            "success":false,
            "status_code":404,
            "message": `Recruitment with id ${id} not found.`
        }
    }
    else{
        return {
            "success":true,
            "recruitment": recruitment
        }
    }
}
async function getCompanyRecruitmentById(companyID) {

    const [recruitments, metadata] = await sequelize.query(
        "SELECT RECR.* FROM CompanyProfiles AS COMP JOIN JobOffers AS OFFERS ON COMP.companyID = OFFERS.companyID " +
        "JOIN Recruitments AS RECR ON OFFERS.offerID = RECR.offerID " +
        "WHERE COMP.companyID = :companyID",
        {
            replacements: { companyID: companyID },
            type: QueryTypes.SELECT
        }
    );
    if(recruitments==null || typeof recruitments === "undefined"){
        return {
            "success":false,
            "status_code":404,
            "message": `Recruitment with companyID ${companyID} not found.`
        }
    }
    else{
        return {
            "success":true,
            "recruitment": recruitments
        }
    }
}
async function getUserRecruitmentById(userID) {

    let recruitment = await recruitments.findOne({where: { userID: userID}});
    if(recruitment===null || recruitment.length === 0){
        return {
            "success":false,
            "status_code":404,
            "message": `Recruitment with userID ${userID} not found.`
        }
    }
    else{
        return {
            "success":true,
            "recruitment": recruitment
        }
    }
}
async function deleteUserRecruitmentById(recruitment_id) {

    let recruitment_r = await getUserRecruitmentById(recruitment_id);
    if(!recruitment_r.success)return recruitment_r;

    await recruitments.destroy({
        where: {
            RecruitmentID: recruitment_id
        }
    });

    return {
        "success": true
    }
}
async function createUserRecruitment(json_in){
    let recruitment_r = await mParseJson(json_in);
    if(recruitment_r.success){
        recruitment_r.recruitment = await recruitment_r.recruitment.save();
    }

    return recruitment_r;
}

async function updateRecruitmentById(id, json_in) {
    let recruitment = await recruitments.update(json_in,
        {
            where: {
                RecruitmentID: id
            }
        });
    if(recruitment==null){
        return {
            "success":false,
            "status_code":404,
            "message": `Recruitment with id ${id} not found.`
        }
    }
    else{
        return {
            "success":true,
            "recruitment": recruitment
        }
    }
}

async function updateUserRecruitment(recruitment_id, json_in){
    let recruitment_r = await getRecruitmentById(recruitment_id);
    console.log(recruitment_r)
    if(!recruitment_r.success)return await mParseJson(json_in);

    await updateRecruitmentById(recruitment_id, json_in);
    recruitment_r.status_code = 201

    return recruitment_r;
}

module.exports = {
    updateUserRecruitment, createUserRecruitment, deleteUserRecruitmentById, getUserRecruitmentById, getCompanyRecruitmentById
}
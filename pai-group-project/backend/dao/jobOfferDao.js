'use strict';

const JobOffer = require("../models/JobOffer");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const UserProfileDao = require("./UserProfileDao");
const CompanyProfileDao = require("./CompanyProfileDao");

async function getAllOffers() {
    return {"offers": await JobOffer.findAll()};
}

async function mParseJson(json_in){
    const required_fields = ["companyID", "address", "categories", "workMode", "end_date"]
    for(let f of required_fields){
        if(!json_in.hasOwnProperty(f)){
            return {
                "success":false,
                "status_code": 400,
                "message": `User data must have a string field '${f}'`
            }
        }
    }

    let offer = JobOffer.build({
        "companyID" : json_in.companyID,
        "address": json_in.address,
        "categories": json_in.categories,
        "workMode": json_in.workMode,
        "remote": json_in.remote,
        "info": json_in.info,
        "offerURL": json_in.offerURL,
        "end_date": json_in.end_date});

    return {
        "success":true,
        "user":offer,
    }
}
async function createOffer(json_in){
    let offer_r = await mParseJson(json_in);
    if(offer_r.success){
        offer_r.user = await offer_r.user.save();
    }

    return offer_r;
}
async function getOfferByID(offerID) {
    let offer = await JobOffer.findByPk(offerID)
    if(offer==null){
        return {
            "success":false,
            "status_code":404,
            "message":`Offer with id: ${offerID} not found`
        }
    }

    return {
        "success": true,
        "offer": offer
    }

}

module.exports = {
    getOfferByID, getAllOffers, createOffer
}
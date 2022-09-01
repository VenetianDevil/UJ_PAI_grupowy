'use strict';

const JobOffer = require("../models/JobOffer");
const {Sequelize, QueryTypes} = require("sequelize");
const sequelize = require("../config/database")

async function getAllOffers() {
    return {"offers": await sequelize.query( "SELECT OFFERS.*, COMP.companyID, COMP.companyInfo, COMP.companyName, COMP.companyURL, COMP.email, COMP.imageURL, COMP.instagram, COMP.linkedIn FROM JobOffers AS OFFERS JOIN CompanyProfiles AS COMP ON OFFERS.companyID = COMP.companyID"  ,
            {
                type: QueryTypes.SELECT
            })}
}

async function mParseJson(json_in){
    const required_fields = ["title", "companyID", "address", "categories", "workMode"]
    for(let f of required_fields){
        if(!json_in.hasOwnProperty(f)){
            return {
                "success":false,
                "status_code": 400,
                "message": `Offer data must have a string field '${f}'`
            }
        }
    }

    let offer = JobOffer.build({
        "title": json_in.title,
        "companyID" : json_in.companyID,
        "address": json_in.address,
        "categories": json_in.categories,
        "workMode": json_in.workMode,
        "remote": json_in.remote,
        "offerInfo": json_in.info,
        "offerURL": json_in.offerURL,
        "end_date": json_in.end_date});

    return {
        "success":true,
        "offer":offer,
    }
}
async function createOffer(json_in){
    let offer_r = await mParseJson(json_in);
    if(offer_r.success){
        offer_r.offer = await offer_r.offer.save();
    }

    return offer_r;
}
async function getOfferByID(offerID) {
    let offer = await sequelize.query( "SELECT OFFERS.*, COMP.companyID, COMP.companyInfo, COMP.companyName, COMP.companyURL, COMP.email, COMP.imageURL, COMP.instagram, COMP.linkedIn FROM JobOffers AS OFFERS JOIN CompanyProfiles AS COMP ON OFFERS.companyID = COMP.companyID" +
    " WHERE OFFERS.offerID = :offerID ",
        {
            replacements: { offerID: offerID },
            type: QueryTypes.SELECT
        })
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

async function getBestOffers() {
    let offers = await sequelize.query( "SELECT * FROM JobOffers AS OFFERS JOIN CompanyProfiles AS COMP ON OFFERS.companyID = COMP.companyID " +
        "ORDER BY RANDOM() LIMIT 5",
        {
            type: QueryTypes.SELECT
        })
    if(offers==null){
        return {
            "success":false,
            "status_code":404,
            "message":`Offers not found`
        }
    }

    return {
        "success": true,
        "offer": offers
    }

}
async function getCompanyOffers(companyID) {
    let companyOffers = await sequelize.query( "SELECT * FROM JobOffers AS OFFERS JOIN CompanyProfiles AS COMP ON OFFERS.companyID = COMP.companyID " +
        "WHERE OFFERS.companyID = " + companyID,
        {
            replacements: { companyID: companyID },
            type: QueryTypes.SELECT
        })
    if(companyOffers==null || companyOffers.length === 0){
        return {
            "success":false,
            "status_code":404,
            "message": `Offers with companyID ${companyID} not found.`
        }
    }

    return {
        "success": true,
        "offers": companyOffers,
    }
}
module.exports = {
    getOfferByID, getAllOffers, createOffer, getBestOffers, getCompanyOffers
}
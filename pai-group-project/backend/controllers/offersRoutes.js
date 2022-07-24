'use strict';

const express = require('express')
const router = express.Router()
const jobOfferDao = require('../dao/jobOfferDao')
const jwtService = require('../services/jwtService')
const userService = require('../services/userService')
require('dotenv').config({ path: 'config/.env'})

const{onClientError, onServerError} = require("./errorHandler");


router.use(express.json())

router.get('/best-offers', (req, res) => {

    jobOfferDao.getBestOffers().then(offer_r => {
            if(offer_r.success){
                res.status(200).json(offer_r.offer)
            }
            else{
                onClientError(res, offer_r.status_code, offer_r.message)
            }
        }
    ).catch(err => onServerError(res, err));
});

router.get('/bulk-offer/:offerID', (req, res) => {
    let offerID = req.params.offerID
    console.log(offerID)
    jobOfferDao.getOfferByID(offerID).then(offer_r => {
            if(offer_r.success){
                res.status(200).json(offer_r.offer)
            }
            else{
                onClientError(res, offer_r.status_code, offer_r.message)
            }
        }
    ).catch(err => onServerError(res, err));
});

router.get('/bulk-offer', (req, res) => {
    jobOfferDao.getAllOffers().then(offers_r => {

        res.status(200).json(offers_r.offer)
    }
    ).catch(err => onServerError(res, err));
});

router.post('/create-offer', (req, res) => {

    jobOfferDao.createOffer(req.body).then(offer_r => {
            if(offer_r.success){
                res.status(200).json(offer_r.offer)
            }
            else{
                onClientError(res, offer_r.status_code, offer_r.message)
            }
        }
    ).catch(err => onServerError(res, err));
});


module.exports = router;
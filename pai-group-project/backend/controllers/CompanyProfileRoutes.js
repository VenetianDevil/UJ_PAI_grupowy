'use strict';

const express = require('express')
const router = express.Router()
const companyProfileDao = require('../dao/CompanyProfileDao')
require('dotenv').config({ path: 'config/.env'})

const{onClientError, onServerError} = require("./errorHandler");


router.use(express.json())

router.get('/best-companies', (req, res) => {

    companyProfileDao.getBestCompanies().then(offer_r => {
            if(offer_r.success){
                res.status(200).json(offer_r.offer)
            }
            else{
                onClientError(res, offer_r.status_code, offer_r.message)
            }
        }
    ).catch(err => onServerError(res, err));
});

router.get('/companies', (req, res) => {
    companyProfileDao.getAllCompanies().then(companies_r => {

            res.status(200).json(companies_r.companies)
        }
    ).catch(err => onServerError(res, err));
});

router.get('/:companyID/offers', (req, res) => {
    let companyID = req.params.companyID

    companyProfileDao.getCompanyOffers(companyID).then(offer_r => {
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
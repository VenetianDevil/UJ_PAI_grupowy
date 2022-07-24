'use strict';

const express = require('express')
const router = express.Router()
const jobOfferDao = require('../dao/jobOfferDao')
const recruitmentsDao = require('../dao/recruitmentsDao')
const jwtService = require('../services/jwtService')
const userService = require('../services/userService')
require('dotenv').config({ path: 'config/.env'})

const{onClientError, onServerError} = require("./errorHandler");


router.use(express.json())

router.post('/job-apply', (req, res) => {

    recruitmentsDao.createUserRecruitment(req.body).then(recruitment_r => {
            if(recruitment_r.success){
                res.status(200).json(recruitment_r.offer)
            }
            else{
                onClientError(res, recruitment_r.status_code, recruitment_r.message)
            }
        }
    ).catch(err => onServerError(res, err));
});

router.get('/user/:userID/recruitments', (req, res) => {
    let userID = req.params.userID
    console.log(userID)
    recruitmentsDao.getUserRecruitmentById(userID).then(recruitment_r_r => {

            res.status(200).json(recruitment_r_r.recruitment)
        }
    ).catch(err => onServerError(res, err));
});

router.get('/companies/:companyID/recruitments', (req, res) => {
    let companyID = req.params.companyID
    recruitmentsDao.getCompanyRecruitmentById(companyID).then(recruitment_r_r => {

            res.status(200).json(recruitment_r_r.recruitment)
        }
    ).catch(err => onServerError(res, err));
});

router.put('/:recruitmentID', (req, res) => {
    let recruitmentID = req.params.recruitmentID

    recruitmentsDao.updateUserRecruitment(recruitmentID, req.body).then(recruitment_r_r => {
            if(recruitment_r_r.success){
                res.status(200).json(recruitment_r_r.offer)
            }
            else{
                onClientError(res, recruitment_r_r.status_code, recruitment_r_r.message)
            }
        }
    ).catch(err => onServerError(res, err));
});

module.exports = router;
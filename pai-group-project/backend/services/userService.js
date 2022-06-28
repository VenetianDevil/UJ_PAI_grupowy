'use strict';

const userDao = require('../dao/userDao');
const bcrypt = require('bcrypt');

async function authenticate(username, password) {
    const user = await userDao.getUserByUsername(username)
    if(user == null) {
        return false
    }

    return await bcrypt.compare(password, user.password)
}

async function authenticateAndGetUser(username, password) {
    const user = await userDao.getUserByUsername(username);
    if(user == null) {
        return null;
    }

    let success = await bcrypt.compare(password, user.password);
    return success ? user : null;
}

function getUserData(user_in){
    return {
        "id":user_in.id,
        "login": user_in.login
    }
}

module.exports = {
    authenticate, authenticateAndGetUser, getUserData
}
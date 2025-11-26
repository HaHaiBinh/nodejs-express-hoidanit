import { handleLogin } from "services/client/auth.service";

var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var db = require('../db');

const configPassportLocal = () => {
    passport.use(new LocalStrategy(async function verify(username, password, cb) {
        return await handleLogin(username, password, cb);
    }));
}

export default configPassportLocal;
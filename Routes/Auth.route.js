const express = require('express')
const router = express.Router()
const AuthController = require('../Controllers/Auth.Controller')
const { body } = require("express-validator");

router.post('/register',   
    // validate fields.
    body("name").isLength({ min: 1 }).trim().withMessage("Name must be specified.")
        .isAlphanumeric().withMessage("Name has non-alphanumeric characters."),
    body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
        .isEmail().withMessage("Email must be a valid email address."),
    body("password").isLength({ min: 8 }).trim().withMessage("Password must be 8 characters or greater."),
    body("gender").isLength({ min: 1 }).trim().withMessage("Gender name must be specified."),
    body("role").isLength({ min: 1 }).trim().withMessage("Role name must be specified."),
    // sanitize fields.
    body("name").escape(),
    body("email").escape(),
    body("password").escape(),
    body("gender").escape(),
    body("role").escape(),
    AuthController.register)

router.post('/login', 
    body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
    .isEmail().withMessage("Email must be a valid email address."),
    body("password").isLength({ min: 8 }).trim().withMessage("Password must be 8 characters or greater."),
    body("email").escape(),
    body("password").escape(),
    AuthController.login)

router.get('/verify', AuthController.userAuthorization)

router.delete('/logout', AuthController.logout)

module.exports = router

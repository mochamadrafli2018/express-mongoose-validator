const createError = require('http-errors')
const User = require('../Models/User.model')
const { validationResult } = require("express-validator");
const {
  signAccessToken,
  verifyAccessToken,
} = require('../helpers/jwt_helper')

module.exports = {
  register: async (req, res, next) => {
    try {
			// Extract the validation errors from a request.
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation Error.",
          errors: errors.array()
        });
      } 
      else {
        // if email already exist
        const doesExist = await User.findOne({ email: req.body.email })
        if (doesExist)
          throw createError.Conflict(`${req.body.email} is already been registered`)
        const user = new User(req.body)
        const savedUser = await user.save()
        console.log(savedUser.id)

        const accessToken = await signAccessToken(savedUser.id)
        console.log(accessToken)
        res.status(200).send({
          id: savedUser.id,
          accessToken: accessToken
        })
      }
    } 
    catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },

  login: async (req, res, next) => {
    try {
			// Extract the validation errors from a request.
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation Error.",
          errors: errors.array()
        });
      } 
        else {
        // if email not exist
        const user = await User.findOne({ email: req.body.email })
        if (!user) throw createError.NotFound('User not registered')
        console.log(user._id)
        // if password is not match
        const isMatch = await user.isValidPassword(req.body.password)
        if (!isMatch)
          throw createError.Unauthorized('Email/password not valid')
        console.log(isMatch)

        const accessToken = await signAccessToken(user.id)
        console.log(accessToken)

        res.status(200).send({ 
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token: accessToken,
        })
      }
    } catch (error) {
      console.log(error)
      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid email/password'))
        console.log(error.isJoi)
      next(error)
    }
  },

  userAuthorization: async (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized())
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    // decoded JWT Token
    const decodedResult = await verifyAccessToken(token)
    console.log(decodedResult.id)

    try {
      const user = await User.findOne({ _id: decodedResult.id })
      console.log(user.id)
      if (user.role === 'admin') {
          return res.status(200).send({
              message: 'congratulations! there is no hidden content', name: user.name,
          });
      }
      return res.status(200).send({
          message: 'congratulations! but there is a hidden content', name: user.name,
      });
    } catch (error) {
      return res.status(401).send({message: 'invalid jwt token'});
    }
  },

  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      // const userId = await verifyRefreshToken(refreshToken)
    } catch (error) {
      next(error)
    }
  },
}

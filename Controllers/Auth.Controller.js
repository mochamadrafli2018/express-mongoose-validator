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
        if (await User.findOne({ email: req.body.email }))
          throw createError.Conflict(`${req.body.email} is already been registered`) // 409

        const user = new User(req.body)
        const savedUser = await user.save()
        console.log(savedUser.id)

        const accessToken = await signAccessToken(savedUser.id)
        console.log(accessToken)

        return res.status(200).send({ 
          message: 'success',
          user: {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            role: savedUser.role,
          },
          token: accessToken,
        })
      }
    } 
    catch (error) {
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
      console.log(req.body);
      // if email not exist
      const user = await User.findOne({ email: req.body.email })
      if (!user) throw createError.NotFound('User not registered') // 404
      console.log(user._id)
      // if password is not match
      const isMatch = await user.isValidPassword(req.body.password)
      if (!isMatch)
        throw createError.Unauthorized('Email/password not valid') // 401
      console.log(isMatch)
      const accessToken = await signAccessToken(user.id)
      console.log(accessToken)

      return res.status(200).send({ 
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: accessToken,
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  },

  userAuthorization: async (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized()) // 401
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
}

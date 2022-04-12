const Joi = require('@hapi/joi')

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
  gender: Joi.string().required(),
  role: Joi.string().required()
})

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required()
})

module.exports = {
  registerSchema, 
  loginSchema
}

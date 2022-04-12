const { body, validationResult } = require('express-validator');
const { checkSchema } = require('express-validator');

const registerSchema = checkSchema({
  name: {
    isEmpty: {
      errorMessage: 'Name should not be empty',
      options: false
    }
  },
  email: {
    isEmpty: {
      errorMessage: 'Email should not be empty',
      options: false
    },
    isEmail: {
      bail: true,
    },
  },
  password: {
    isEmpty: {
      errorMessage: 'Password should not be empty',
      options: false
    },
    isLength: {
      errorMessage: 'Password should be at least 8 chars long',
      options: { min: 8 },
    },
  },
  gender: {
    isEmpty: {
      errorMessage: 'Gender should not be empty',
      options: false
    },
  },
  role: {
    isEmpty: {
      errorMessage: 'Role should not be empty',
      options: false,
    },
  },
})

const loginSchema = checkSchema({
  email: {
    isEmpty: {
      errorMessage: 'Email should not be empty',
      options: false
    },
    isEmail: {
      bail: true,
    },
  },
  password: {
    isEmpty: {
      errorMessage: 'Password should not be empty',
      options: false
    },
    isLength: {
      errorMessage: 'Password should be at least 8 chars long',
      options: { min: 8 },
    },
  }
})

module.exports = {
  registerSchema, 
  loginSchema
}

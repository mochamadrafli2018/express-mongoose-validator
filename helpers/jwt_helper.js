const JWT = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {id: userId}
      const secret = process.env.ACCESS_TOKEN_SECRET
      const options = {
        expiresIn: '1h',
        // issuer: 'pickurpage.com',
        // audience: userId,
      }
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message)
          reject(createError.InternalServerError())
          return
        }
        resolve(token)
      })
    })
  },
  verifyAccessToken: (token) => {
    return new Promise((resolve, reject) => {
      JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedResult) => {
        if (err) {
          const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
          reject(createError.Unauthorized(message))
          return
        }
        resolve(decodedResult)
      })
    })
  },
}

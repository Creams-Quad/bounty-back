const jwksClient = require('jwks-rsa')
const jwt = require('jsonwebtoken')

const client = jwksClient({
  jwksUri: 'https://dev-b086be-1.us.auth0.com/.well-known/jwks.json'
})

function getKey (headers, callback) {
  client.getSigningKey(headers.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey
    callback(null, signingKey)
    console.log(err)
  })
}

module.exports = function verifyToken (token, callback) {
  jwt.verify(token, getKey, {}, (err, user) => {
    if (err) {
      console.error('Something Went Wrong')
      return callback(err)
    }
    console.log({ user })
    callback(user)
  })
}

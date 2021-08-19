const verifyToken = require('./verifiedToken.js')

const { users } = require('../models/index.js')

module.exports = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  const model = users.model
  console.log('line 8', model)

  verifyToken(token, getUser)

  async function getUser (user) {
    console.log('line 12', user)
    const userRecord = await model.find({ where: { email: user.email } })
    req.user = userRecord
    next()
  }
  next('user not found')
}

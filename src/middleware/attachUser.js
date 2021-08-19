const verifyToken = require('./verifiedToken.js')

const { users } = require('../models/index.js')

module.exports = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  const model = users.model

  verifyToken(token, getUser)

  async function getUser (user) {
    const userRecord = await model.find({ where: { email: user.email } })
    req.user = userRecord
    next()
  }
  next('user not found')
}

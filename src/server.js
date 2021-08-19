const cors = require('cors')
const express = require('express')

const v2Routes = require('./routes/v2')

const verifyToken = require('../src/middleware/verifiedToken.js')

const dataModules = require('../src/models/index.js')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v2', v2Routes)

app.post('/login', getOneUser)

function getOneUser (req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    verifyToken(token, getUser)

    async function getUser (user) {
      const { model } = dataModules.users
      let userRecord = await model.find({ where: { email: user.email } })
      if (userRecord) {
        res.status(200).json(userRecord)
      }
      userRecord = await model.create(user)
      res.status(200).json(userRecord)
    }
  } catch (e) {
    res.status(500).send(e)
  }
}

module.exports = {
  app: app,
  start: (PORT) => {
    app.listen(PORT, () => console.log(`Alert, Awake, Alive ${PORT}`))
  }
}

const cors = require('cors')
const express = require('express')

const v1Routes = require('./routes/v1')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', v1Routes)

module.exports = {
  app: app,
  start: (PORT) => {
    app.listen(PORT, () => console.log(`Alert, Awake, Alive ${PORT}`))
  }
}

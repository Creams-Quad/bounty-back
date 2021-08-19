const cors = require('cors')
const express = require('express')

const v2Routes = require('./routes/v2')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v2', v2Routes)

module.exports = {
  app: app,
  start: (PORT) => {
    app.listen(PORT, () => console.log(`Alert, Awake, Alive ${PORT}`))
  }
}

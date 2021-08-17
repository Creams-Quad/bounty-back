const cors = require('cors')
const express = require('express')

const app = express()
app.use(cors())

app.use('/*', (req, res) => {
  res.status(404).send()
})

module.exports = {
  app: app,
  start: (PORT) => {
    app.listen(PORT, () => console.log(`Alert, Awake, Alive ${PORT}`))
  }
}

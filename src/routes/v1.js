const express = require('express')

const router = express.Router()

const dataModules = require('../models')

const { verifyToken } = require('../middleware/verifiedToken.js')

const permissions = require('../middleware/permissions.js')

const attachUser = require('../middleware/attachUser.js')

router.param('model', (req, res, next) => {
  const modelName = req.params.model
  if (dataModules[modelName]) {
    req.collection = dataModules[modelName]
    next()
  } else {
    next('invalid model')
  }
})

router.get('/:model', attachUser, permissions('read'), readAll)
router.get('/:model/:id', attachUser, permissions('read'), readOne)
router.post('/:model', permissions('create'), createOne)
router.put('/:model/:id', attachUser, permissions('update'), updateOne)
router.delete('/:model/:id', attachUser, permissions('delete'), deleteOne)
router.post('/login', getOneUser)

async function readAll (req, res) {
  const records = await req.collection.read()
  res.status(200).json(records)
}

async function readOne (req, res) {
  const id = req.params.id
  let modelParams = {}
  if (req.collection.name === 'bounties') {
    modelParams = {
      include: dataModules.comments.model
    }
  }
  const record = await req.collection.read(id, modelParams)

  res.status(200).json(record)
}

async function createOne (req, res) {
  const json = req.body
  const record = await req.collection.create(json)

  res.status(201).json(record)
}

async function updateOne (req, res) {
  try {
    const json = req.body
    const id = req.params.id
    const updatedRecord = await req.collection.update(id, json)

    res.status(200).json(updatedRecord)
  } catch (error) {
    res.status(500).send(error)
  }
}

function deleteOne (req, res) {
  const id = req.params.id
  req.collection.delete(id)

  res.status(204).send()
}

function getOneUser (req, res) {
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
}

module.exports = router

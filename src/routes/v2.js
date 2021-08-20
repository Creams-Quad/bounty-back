const express = require('express')

const router = express.Router()

const dataModules = require('../models')

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
router.post('/:model', attachUser, permissions('read'), createOne)
router.put('/:model/:id', attachUser, permissions('update'), updateOne)
router.delete('/:model/:id', attachUser, permissions('delete'), deleteOne)

async function readAll (req, res) {
  try {
    let records
    if (req.collection.name === 'bounties') {
      records = await req.collection.read(null, {
        include: dataModules.comments.model
      })
    } else {
      records = await req.collection.read()
    }
    res.status(200).json(records)
  } catch (e) {
    res.status(500).send(e)
  }
}

async function readOne (req, res) {
  try {
    const id = req.params.id
    let modelParams = {}
    if (req.collection.name === 'bounties') {
      modelParams = {
        include: dataModules.comments.model
      }
    }
    const record = await req.collection.read(id, modelParams)

    res.status(200).json(record)
  } catch (e) {
    res.status(500).send(e)
  }
}

async function createOne (req, res) {
  try {
    const json = req.body
    const record = await req.collection.create(json)

    res.status(201).json(record)
  } catch (e) {
    res.status(500).send(e)
  }
}

async function updateOne (req, res) {
  try {
    const json = req.body
    const id = req.params.id
    const updatedRecord = await req.collection.update(id, json)

    res.status(200).json(updatedRecord)
  } catch (e) {
    res.status(500).send(e)
  }
}

function deleteOne (req, res) {
  try {
    const id = req.params.id
    req.collection.delete(id)

    res.status(204).send()
  } catch (e) {
    res.status(500).send(e)
  }
}

module.exports = router

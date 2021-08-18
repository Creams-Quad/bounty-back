const express = require('express')
const router = express.Router()

const dataModules = require('../models')

router.param('model', (req, res, next) => {
  const modelName = req.params.model
  if (dataModules[modelName]) {
    req.collection = dataModules[modelName]
    next()
  } else {
    next('invalid model')
  }
})

router.get('/:model', readAll)
router.get('/:model/:id', readOne)
router.post('/:model', createOne)
router.put('/:model/:id', updateOne)
router.delete('/:model/:id', deleteOne)

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

module.exports = router

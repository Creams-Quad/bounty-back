'use strict'

require('dotenv').config()

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:'

const { Sequelize, DataTypes } = require('sequelize')

const bountiesModel = require('./bountiesSchema.js')
const commentsModel = require('./commentsSchema.js')
const usersModel = require('./usersSchema.js')
const Collection = require('./collection-class')

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

const bounties = bountiesModel(sequelize, DataTypes)
const comments = commentsModel(sequelize, DataTypes)
const users = usersModel(sequelize, DataTypes)

// created our Collections instances, pass a ('name' , model)
const bountiesCollection = new Collection('bounties', bounties)
const commentsCollection = new Collection('comments', comments)
const usersCollection = new Collection('users', users)

bountiesCollection.createAssociation('hasMany', commentsCollection.model, {
  foreignKey: 'bountyId',
  sourceKey: 'id'
})
commentsCollection.createAssociation('belongsTo', bountiesCollection.model, {
  foreignKey: 'bountyId',
  targetKey: 'id'
})

module.exports = {
  db: sequelize,
  bountiesCollection,
  commentsCollection,
  usersCollection
}

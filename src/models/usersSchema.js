'use strict'
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET || 'secretstring'

const usersModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Users', {
    role: { type: DataTypes.ENUM('explorer', 'poster', 'hunter', 'guild master'), required: true, defaultValue: 'explorer' },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    karma: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    permissions: {
      type: DataTypes.VIRTUAL,
      get () {
        const acl = {
          explorer: ['read'],
          poster: ['read', 'create'],
          hunter: ['read', 'create', 'update'],
          guildMaster: ['read', 'create', 'update', 'delete']
        }
        return acl[this.role]
      }
    }
  })
  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET)
      //==== change findOne to findOrCreate ======//
      const user = this.findOrCreate({ where: { email: parsedToken.email } })
      if (user) { return user }
      throw new Error('User Not Found')
    } catch (e) {
      throw new Error(e.message)
    }
  }
  return model
}

module.exports = usersModel

'use strict'

const usersModel = (sequelize, DataTypes) => {
  return sequelize.define('Users', {
    role: {
      type: DataTypes.ENUM('explorer', 'poster', 'hunter', 'guildMaster'),
      allowNull: false,
      defaultValue: 'explorer'
    },
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
}

module.exports = usersModel

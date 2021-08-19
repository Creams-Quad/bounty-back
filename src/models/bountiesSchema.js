'use strict'

const bountiesModel = (sequelize, DataTypes) => {
  return sequelize.define('Bounties', {
    poster: {
      type: DataTypes.STRING,
      require: true
    },
    header: {
      type: DataTypes.STRING,
      require: true
    },
    content: {
      type: DataTypes.TEXT,
      require: true
    },
    karma: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  })
}

module.exports = bountiesModel

'use strict'

const commentsModel = (sequelize, DataTypes) => {
  return sequelize.define('Comments', {
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
    },
    bountyId: {
      type: DataTypes.INTEGER,
      require: true
    }
  })
}

module.exports = commentsModel

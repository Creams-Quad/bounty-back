'use strict'

class Collection {
  constructor(name, model) {
    this.name = name;
    this.model = model;
  }

  read(id, options = {}) {
    const modelParams = { ...options };
    if (id) {
      modelParams.where = { id: id };
      return this.model.findOne(modelParams);
    } else {
      return this.model.findAll(modelParams);
    }
  }

  create(json) {
    return this.model.create(json);
  }

  async update(id, json) {
    const row = await this.model.findOne({
      where: {
        id: id
      }
    });

    const updatedRow = await row.update(json);
    return updatedRow;
  }

  delete(id) {
    return this.model.destroy({
      where: {
        id: id
      }
    });
  }

  createAssociation(type, model, options) {
    // type == (hasMany) || (belongsToMany)
    // model ==  some sequelize model
    // options {foreignKey, sourceKey}
    try {
      this.model[type](model, options);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Collection;

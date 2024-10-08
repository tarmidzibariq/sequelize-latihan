'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Files extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Users,{ foreignKey: 'avatar', as: 'Avatar' });
      this.hasOne(models.Posts,{ foreignKey: 'thumbnail', as: 'Thumbnail' });
    }
  }
  Files.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fileName: DataTypes.STRING,
    type: DataTypes.STRING,
    url: DataTypes.STRING,
    path: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Files',
  });
  return Files;
};
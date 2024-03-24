'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Files, { foreignKey: 'avatar', as: 'Avatar' });
    }
  }
  Users.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: DataTypes.STRING,
    email:    DataTypes.STRING,
    role:     DataTypes.ENUM("Super Admin", "Creator"),
    password: DataTypes.STRING,
    status:   DataTypes.ENUM("Active", "Suspend"),
    avatar:   DataTypes.UUID,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
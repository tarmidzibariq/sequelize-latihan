'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostsCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Posts, { foreignKey: 'postId', as: 'categoryAssociations' });
      this.belongsTo(models.Categories, { foreignKey: 'categoryId', as: 'relatedPostsCategories' });
    }
  }
  PostsCategories.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    postId: DataTypes.UUID,
    categoryId: DataTypes.UUID,
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
    modelName: 'PostsCategories',
  });
  return PostsCategories;
};
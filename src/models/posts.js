'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.PostsCategories, { foreignKey: 'postId', as: 'categoryAssociations' });
      this.belongsTo(models.Files, { foreignKey: 'thumbnail', as: 'Thumbnail' });

    }
  }
  Posts.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    thumbnail: DataTypes.UUID,
    status: DataTypes.ENUM("Draft","Published"),
    slug: DataTypes.STRING,
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
    modelName: 'Posts',
  });
  return Posts;
};
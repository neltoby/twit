'use strict';
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'myCompositeIndexName'
    },
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'myCompositeIndexName'
    }
  }, {
    updatedAt: false,
  });
  Likes.associate = function(models) {
    // associations can be defined here
    Likes.belongsTo(models.Users, {
      foreignKey: {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    })
    Likes.belongsTo(models.Post, {
      foreignKey: {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    })
  };
  return Likes;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    updatedAt: false
  });
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Users, {
      foreignKey: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      }
    })
    Comment.belongsTo(models.Post, {
      foreignKey: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      }
    })
  };
  return Comment;
};
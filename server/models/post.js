'use strict';
const Users  = require('./').Users
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // This is a reference to another model
        model: Users,
  
        // This is the column name of the referenced model
        key: 'id',
  
        // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
        // deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    posts: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
    }
  }, {
    updatedAt: false
  });
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.Users, {
      foreignKey: {
        onDelete: 'CASCADE',
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    })
    Post.hasMany(models.Comment, {
      foreignKey: {
        name: 'PostId',
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    })
    Post.hasMany(models.Likes, {
      foreignKey: {
        name: 'PostId',
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    })
  };
  return Post;
};
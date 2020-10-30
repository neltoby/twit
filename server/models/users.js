'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, 
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value){
          this.setDataValue('password', bcrypt.hashSync(value, salt));
      },
      // get(){
      //   return null
      // }
    },
    username: {
      type: DataTypes.VIRTUAL,
      get(){
        const val = this.email.split('@')
        return val[0] ? val[0] : null
      }
    }
  }, {
    updatedAt: false
  });
  Users.associate = function(models) {
    // associations can be defined here
    Users.hasMany(models.Post, {
      foreignKey: {
        name: 'UserId',
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    })
    Users.hasMany(models.Comment, {
      foreignKey: {
        name: 'UserId',
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    })
    Users.hasMany(models.Likes, {
      foreignKey: {
        name: 'UserId',
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    })
  };
  return Users;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.User.hasMany(models.Book, { as: 'books' })
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        },
        nameValidator() {
          if (this.dataValues.name === '') {
            throw new Error("name can't be blank");
          }
        },
        emailValidator() {
          if (this.dataValues.email === '') {
            throw new Error("email can't be blank");
          }
        }
      }
    },
    email: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
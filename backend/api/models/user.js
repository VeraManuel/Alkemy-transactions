"use strict";
const { Model } = require("sequelize");
const { uuid } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Operation }) {
      // define association here
      this.hasMany(Operation, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a name!" },
          notEmpty: { msg: "User must have a name!" },
        },
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a lastname!" },
          notEmpty: { msg: "User must have a lastname!" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a email!" },
          notEmpty: { msg: "User must have a email!" },
          isEmail: { msg: "The email must be valid!" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a password!" },
          notEmpty: { msg: "User must have a password!" },
        },
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );

  User.beforeCreate((user) => (user.id = uuid));

  return User;
};

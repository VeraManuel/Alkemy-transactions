"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Operation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Category }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId" });
      this.belongsTo(Category, { foreignKey: "categoyId" });
    }
  }
  Operation.init(
    {
      concept: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "opetarions",
      modelName: "Operation",
    }
  );
  return Operation;
};

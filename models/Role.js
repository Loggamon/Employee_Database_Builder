const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    salary: {
      type: DataTypes.DECIMAL,
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "department", // 'department' refers to table name
        key: "id", // 'id' refers to column name in fathers table
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "role",
  }
);

module.exports = Role;

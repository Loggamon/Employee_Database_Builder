const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Employee extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "role", // 'role' refers to table name
        key: "id", // 'id' refers to column name in fathers table
      },
    },
    manager_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "employee", // 'employee' refers to table name
        key: "id", // 'id' refers to column name in fathers table
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "employee",
  }
);

module.exports = Employee;

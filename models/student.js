// student.js

const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./user");

const Student = sequelize.define("Student", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  }
}, {
  tableName: "Students",
});

// Define the association
Student.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Student, { foreignKey: 'userId' });

module.exports = Student;

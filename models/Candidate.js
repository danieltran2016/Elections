const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Candidate extends Model {}


Candidate.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vision: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      education: {
        type: DataTypes.TEXT,
      },
      work_experience: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
      },
      votes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'candidate',
    }
  );
  
  module.exports = Candidate;
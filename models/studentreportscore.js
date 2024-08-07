"use strict";
const {Model,Sequelize, STRING} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class studentReportScores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  studentReportScores.init(
    {
      user_id: DataTypes.INTEGER,
      mathematics1: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      mathematics2: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      mathematics3: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      mathematics4: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      mathematics5: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      science1: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      science2: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      science3: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      science4: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      science5: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      indonesian1: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      indonesian2: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      indonesian3: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      indonesian4: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      indonesian5: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      english1: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      english2: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      english3: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      english4: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      english5: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      total_report_score:{
        type: DataTypes.FLOAT,
        allowNull:true
      },
    },
    {
      sequelize,
      modelName: "studentReportScores",
    }
  );
  return studentReportScores;
};

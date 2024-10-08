'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Auth extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Auth.belongsTo(models.User, {
				foreignKey: 'user_id',
			});
		}
	}
	Auth.init(
		{
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			user_number: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					args: true,
					msg: 'NISN is already been taken',
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			confirm_password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Auth',
		}
	);
	return Auth;
};

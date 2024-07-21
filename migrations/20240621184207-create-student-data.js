'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('studentData', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			student_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			student_gender: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			place_birth: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			date_birth: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			student_address: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			student_distance: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			student_religion: {
				type: Sequelize.ENUM(['Islam', 'Kristen', 'Budha', 'Hindu']),
				defaultValue: 'Islam',
				allowNull: false,
			},
			student_blood_type: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			student_weight: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			student_height: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			student_child: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			student_kps: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			student_hobby: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			father_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			father_job: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			place_birth_father: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			father_birth: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			mother_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			mother_job: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			place_birth_mother: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			mother_birth: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			guardian_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			phoneNumber_house: {
				type: Sequelize.STRING,
				allowNull: false,
			},

			guardian_name: {
				type: Sequelize.STRING,
			},
			guardian_address: {
				type: Sequelize.STRING,
			},
			guardian_phone: {
				type: Sequelize.STRING,
			},
			guardian_job: {
				type: Sequelize.STRING,
			},
			school_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			school_address: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			ijazah_number: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			nisn: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			document_id: {
				type: Sequelize.Sequelize.STRING,
				allowNull: true,
				defaultValue: null,
			},
			createdAt: {
				type: Sequelize.DATE,
			},
			updatedAt: {
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('studentData');
	},
};

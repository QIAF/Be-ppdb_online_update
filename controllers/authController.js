const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');
const { User, Auth } = require('../models');

const register = async (req, res, next) => {
	try {
		const { full_name, age, user_role, email, password, confirm_password } = req.body;
		const saltRounds = 10;
		const hashedPassword = bcrypt.hashSync(password, saltRounds);
		const hashedConfirmPassword = bcrypt.hashSync(confirm_password, saltRounds);

		const newUser = await User.create({
			full_name,
			age,
			user_role,
		});

		const auth = await Auth.create({
			user_id: newUser.id,
			email,
			password: hashedPassword,
			confirm_password: hashedConfirmPassword,
		});

		res.status(201).json({
			status: true,
			message: 'User created successfully',
			data: {
				user: {
					id: newUser.id,
					name: newUser.full_name,
					age: newUser.age,
					user_role: newUser.user_role,
					createdAt: newUser.createdAt,
					updatedAt: newUser.updatedAt,
				},
				auth: {
					email: auth.email,
					password: hashedPassword,
					createdAt: auth.createdAt,
					updatedAt: auth.updatedAt,
				},
			},
		});
	} catch (err) {
		return next(new ApiError(err.message, 500));
	}
};
const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		console.log(req.body);

		if (!email || !password) {
			return next(new ApiError('Please enter email or password', 400));
		}
		const findUser = await Auth.findOne({
			where: {
				email,
			},
			include: ['User'],
		});

		const userData = JSON.parse(JSON.stringify(findUser));
		console.log(userData);
		if (!findUser) {
			return next(new ApiError('User not found', 400));
		}
		bcrypt.compareSync(password, findUser.password);
		const token = jwt.sign(
			{
				user_id: findUser.user_id,
				full_name: findUser.User.full_name,
				user_role: findUser.User.user_role,
				email: findUser.email,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXPIRED,
			}
		);

		res.cookie('_token', token, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 100,
		});

		res.status(200).json({
			status: 'true',
			message: 'Login successfully',
			_token: token,
		});
	} catch (err) {
		return next(new ApiError(err.message, 500));
	}
};
module.exports = {
	register,
	login,
};

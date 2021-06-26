const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registervalidate, loginvalidate } = require("../config/Validation");
module.exports = {
	register: async (req, res) => {
		// validate the data before make user
		const { error } = registervalidate(req.body);
		if (error) return res.status(400).send(error.details[0].message);
		// Check existing user
		const emailexit = await User.findOne({ email: req.body.email });
		if (emailexit) return res.status(403).send("email alredy exists");
		// Check existing user
		const mobileCheck = await User.findOne({ mobile: req.body.mobile });
		if (mobileCheck) return res.status(403).send("mobile no already exists");
		// hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			mobile: req.body.mobile,
			password: hashedPassword,
		});
		try {
			const savedUser = await user.save();
			res.json(`Register successfully welcome ${savedUser.name}`);
		} catch (err) {
			res.status(400).json(err.message);
		}
	},
	// Login controller
	login: async (req, res) => {
		// validation before login
		const { error } = loginvalidate(req.body);
		if (error) return res.status(400).send(error.details[0].message);
		// Check email user
		let user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(400).send("Email not found");
		// check password
		const validpassword = await bcrypt.compare(
			req.body.password,
			user.password,
		);
		if (!validpassword) return res.status(400).send("Invalid password");
		// create token
		const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
		user = delete user.password;
		res.header("auth-token", token).send({ token, user });
	},

	// Get all the users
	GetUsers: async (req, res) => {
		try {
			const alluser = await User.find({});
			if (alluser.length > 0) {
				res.status(200).json(alluser);
			} else {
				res.json("no user found");
			}
		} catch (error) {
			res.json(error);
		}
	},

	// Update user by there id
	UpdateUser: async (req, res) => {
		try {
			if (req.body.email) {
				return res.json("email can't update");
			}
			const update = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			});
			if (update) {
				res.status(200).json("update successfully");
			} else {
				res.status(400).json("user not found");
			}
		} catch (error) {
			res.status(400).json(error);
		}
	},
	// Delete user by Id
	DeleteUser: async (req, res) => {
		try {
			const deleteuser = await User.findByIdAndDelete({ _id: req.params.id });
			if (deleteuser) {
				res.status(200).json(`User id:${deleteuser._id} deleted successfuly`);
			} else {
				res.status(400).json("user not found");
			}
		} catch {
			res.status(400).json("user not found");
		}
	},
};

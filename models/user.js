const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) => {
	if (!email){
		return false;
	} else {
		if (email.length < 5 || email.length > 30){
			return false;
		} else{
			return true;
		}
	}
}

let validEmailChecker = (email) => {
	if (!email){
		return false;
	} else {
		const regExp = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/);
		return regExp.test(email);
	}
}

const emailValidators = [
	{
		validator: emailLengthChecker, 
		message: "E-mail must be atleast 5 characters but no more than 30"
	},
	{
		validator: validEmailChecker,
		message: "Must be a valid E-mail"
	}
]

let usernameLengthChecker = (username) =>{
	if (!username){
		return false;
	} else {
		if (username.length < 3 || username.length > 15){
			return false;
		} else{
			return true;
		}
	}
}

let validUsername = (username) => {
	if (!username){
		return false;
	} else {
		const regExp = new RegExp(/^[A-Za-z0-9]+$/);

		return regExp.test(username);
	}
}

const usernameValidators = [
	{
		validator: usernameLengthChecker,
		message: "Username must be atleast 3 characters but no more than 15"
	},
	{
		validator: validUsername,
		message: "Username should not have any special characters"
	}
]

let passwordLengthChecker = (password) => {
	if (!password){
		return false;
	} else {
		if (password.length < 8 || password.length > 35){
			return false;
		} else{
			return true;
		}
	}
}

let validPassword = (password) => {
	if (!password){
		return false;
	} else {
		const regExp = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,35}$/);
		return regExp.test(password);
	}
}

const passwordValidators = [
	{
		validator: passwordLengthChecker,
		message: "Password must be atleast 8 characters but no more than 35"
	},
	{
		validator: validPassword,
		message: "Password must have atleast one number, character, special character."
	}
]

/*
Collection Name :User
*/
const User = mongoose.Schema({
	email     	:  	{ type: String, required: true, unique: true, lowercase: true, validate: emailValidators},
	username 	:  	{ type: String, required: true, unique: true, lowercase: true, validate: usernameValidators},
	password  	:  	{ type: String, required: true, validate: passwordValidators},
}, { collection: 'user' });

User.pre('save', function(next) {
	if(!this.isModified('password'))
	return next();

	bcrypt.hash(this.password, null, null, (err,hash) => {
		if (err) return next(err);
		this.password = hash;
		next();
	})
});

User.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

// exports.User = mongoose.model('user' , User);
module.exports = mongoose.model('user', User);
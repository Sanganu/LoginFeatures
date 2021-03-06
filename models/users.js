
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
mongoose.promise = Promise


const userSchema = new Schema({
    email: {
			type : String,
			unique:true,
      required: true
     },
		name: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
    gameId : {
      type: Schema.Types.ObjectId
    }
    
});

// Define userSchema
// const userSchema = new Schema({
// 	firstName: { type: String, unique: false },
// 	lastName: { type: String, unique: false },
// 	local: {
// 		username: { type: String, unique: false, required: false },
// 		password: { type: String, unique: false, required: false }
// 	},
// 	google: {
// 		googleId: { type: String, required: false }
// 	},
// 	photos: []
// 	// local: {
// 	// 	email: { type: String, unique: true },
// 	// 	password: { type: String }
// 	// },
// 	// google: {
// 	// 	id: { type: String },
// 	// 	photos: []
// 	// },
// 	// firstName: { type: String },
// 	// lastName: { type: String }
// })

// Define schema methods
userSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function(next) {
	if (!this.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.password = this.hashPassword(this.password)
		next()
	}
	// this.password = this.hashPassword(this.password)
	// next()
})

// Create reference to User & export
const User = mongoose.model('User', userSchema)
module.exports = User

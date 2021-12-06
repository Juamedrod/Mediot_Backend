const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    avatar: { type: String, required: false },
    dni: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
})

userSchema.plugin(uniqueValidator, { message: 'Credentials has to be uniques, try again!.' });
module.exports = mongoose.model('user', userSchema);
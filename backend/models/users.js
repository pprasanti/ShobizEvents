import mongoose from 'mongoose';
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    username: String,
    password: String,
})
var users = mongoose.model('users', userSchema);

export default users


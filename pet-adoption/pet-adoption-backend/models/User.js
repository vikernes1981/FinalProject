const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Add new profile fields
    bio: { type: String, default: '' },
    profilePicture: { type: String, default: '' },
    contactInfo: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

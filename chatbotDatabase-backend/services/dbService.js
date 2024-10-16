import User from '../models/User.js';

// Register or retrieve a user by their Telegram ID
const registerUser = async (telegramId) => {
    let user = await User.findOne({ telegramId });

    if (!user) {
        user = new User({ telegramId });
        await user.save();
    }

    return user;
};

// Get user by their Telegram ID
const getUserByTelegramId = async (telegramId) => {
    return await User.findOne({ telegramId });
};

export default {
    registerUser,
    getUserByTelegramId
};


const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

exports.signUp = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            username,
            password: hashedPassword
        });
        req.session.user = user;
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            userId: user._id
        });
    } catch (error) {
        res.status(409).json({
            message: 'Username already exists',
            error
        });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });

        const isCorrect = await bcrypt.compare(password, user.password)
        if (isCorrect && !!user) {
            req.session.user = user;
            res.status(200).json({
                status: 'success'
            });
        } else {
            res.status(400).json({
                status: 'fail',
                message: 'wrong username or password'
            });
        }

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    }
};
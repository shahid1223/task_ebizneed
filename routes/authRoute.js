const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/UserModle');

router.post('/createUser', [
    body('name', 'Name is required').exists(),
    body('email', 'Email is required').isEmail(),
    body('password', 'Passsword is required').exists()
], async (req, res) => {

    console.log(req.body, "hello");

    /* return error is name email password is not present in body */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array(), code: 400 })
    };

    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({ error: "user with this email is already exists", code: 400 })
        };

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(password, salt);

        user = new User({
            email: email,
            name: name,
            password: secPassword
        });

        const response = await user.save();

        const payload = {
            user: {
                id: response.id
            }
        };

        jwt.sign(payload,
            process.env.MONGOURI,
            { expiresIn: "24h" },
            (err, token) => {
                if (err) {
                    return err
                };
                res.status(200).json({ token, code: 200 })
            }
        )

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error", code: 500 })
    };
});

router.post('/login', [
    body('email', 'Email is required').isEmail(),
    body('password', 'Passsword is required').exists()
], async (req, res) => {
    /* return error is name email password is not present in body */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array(), code: 400 })
    };

    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ error: "Please enter valid credentials", code: 400 })
        };

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(400).json({ error: "Please enter valid credentials", code: 400 })
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload,
            process.env.MONGOURI,
            { expiresIn: "24h" },
            (err, token) => {
                if (err) {
                    return err
                };
                res.status(200).json({ token, code: 200 })
            }
        )

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal server error", code: 500 })
    };
});

module.exports = router;
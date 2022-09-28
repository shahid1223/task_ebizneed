const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectToMongoDB = () => {
    try {
        mongoose.connect(process.env.MONGOURI, () => {
            console.log('connected to mongoDb')
        })
    } catch (error) {
        console.error(error)
    }
};

module.exports = connectToMongoDB;
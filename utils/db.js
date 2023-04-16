const mongoose = require('mongoose');

const db_connect = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGODB_URI, );
    } catch (error) {
        console.error(error)
    }
};

module.exports = db_connect;

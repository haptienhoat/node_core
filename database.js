const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config()

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect DB successfully!');
    } catch (error) {
        console.log('Connect DB failure!');
    }
}

module.exports = connectDB;
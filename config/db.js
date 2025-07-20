const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

console.log('current DB status;', mongoose.connection.readyState); //logs 0
mongoose.connection.on('connecting', () => {
    console.log('db connecting, Status:', mongoose.connection.readyState); //logs 2
});
mongoose.connection.on('connected', () => {
    console.log('db connected, Status:', mongoose.connection.readyState); //logs 1
});
mongoose.connection.on('disconnecting', () => {
    console.log('db disconnecting, Status:', mongoose.connection.readyState); // logs 3
});
mongoose.connection.on('disconnected', () => {
    console.log('db disconnected, Status:', mongoose.connection.readyState); //logs 0
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'admin', // You can name your DB here
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
const mongoose = require('mongoose');
const Users = require('./models/Users');  // Adjust the path if necessary

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json');

const mongoURI = config[env].uri;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Connected to MongoDB: ${env} database`);
}).catch((err) => {
  console.error(`Error connecting to MongoDB: ${err.message}`);
});

module.exports = {
  Users
};
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Vet = require('./src/models/Vet');
const User = require('./src/models/User');

async function check() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected');
    const vetsInCollection = await Vet.find({});
    console.log('Vets in Vet collection:', vetsInCollection.length);
    const usersWithVetRole = await User.find({ role: 'vet' });
    console.log('Users with vet role:', usersWithVetRole.length);
    await mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}
check();

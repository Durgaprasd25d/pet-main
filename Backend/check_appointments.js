const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Appointment = require('./src/models/Appointment');
const User = require('./src/models/User');
const Pet = require('./src/models/Pet');

async function check() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected');
    const appointments = await Appointment.find({})
      .populate("petId", "name type image")
      .populate("vetId", "name specialty clinicName avatar");
    console.log('Appointments sample:', JSON.stringify(appointments.slice(0, 1), null, 2));
    await mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}
check();

const Appointment = require('../models/Appointment');
const User = require('../models/User');

exports.getAllAppointment = async (req, res) => {
  try {
    const data = await Appointment.find()
      .sort({ date: -1 })
      .populate({ path: 'user', select: 'name phone address' })
      .lean(); // optional: return plain objects

    return res.json({ data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};


exports.newAppointment = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "Invalid request!" });
    }

    await Appointment.create({ user: user._id });

    const data = await Appointment.find()
      .sort({ date: -1 })
      .populate({ path: 'user', select: 'name phone address' })
      .lean();

    return res.json({ message: "Appointment initiated!", data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};


exports.deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment already cancelled!" });
    }

    await Appointment.deleteOne({ _id: appointmentId });

    const data = await Appointment.find()
      .sort({ date: -1 })
      .populate({ path: 'user', select: 'name phone address' })
      .lean();

    return res.json({ message: "Appointment cancelled!", data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

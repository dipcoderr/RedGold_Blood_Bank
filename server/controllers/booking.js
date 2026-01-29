const Booking = require('../models/Booking');
const User = require('../models/User');
const Blood = require('../models/Blood');

exports.getAllBooking = async (req, res) => {
  try {
    const data = await Booking.find()
      .sort({ date: -1 })
      .populate('user', ['name', 'phone', 'address'])
      .lean();
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

exports.newBooking = async (req, res) => {
    const { userId, bloodId } = req.body;

    const user = await User.findById(userId);
    const blood = await Blood.findById(bloodId);

    if(!user || !blood) {
        return res.json({ error: "Invalid request!" });
    }

    const booking = new Booking({
        user,
        group: blood.group
    });

    booking.save()
    .then(booking => {
        res.json({ message: "Booking completed!" });
    })
    .catch(err => {
        res.json({ error: "Something went wrong" });
        console.log(err);
    })
}

exports.deleteBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        console.log("Attempting to delete booking with ID:", bookingId);

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            console.log("Booking not found:", bookingId);
            return res.json({ error: "Booking already cancelled!" });
        }

        console.log("Found booking:", booking);
        await Booking.deleteOne({ _id: bookingId });
        console.log("Booking deleted successfully");

        const data = await Booking.find()
            .sort({ date: -1 })
            .populate('user', ['name', 'phone', 'address'])
            .lean();

        console.log("Returning updated booking list, count:", data.length);
        res.json({ message: "Booking cancelled!", data });
    } catch (err) {
        console.error("Error in deleteBooking:", err);
        res.json({ error: "Something went wrong!" });
    }
}
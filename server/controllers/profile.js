const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.userId || req.user?._id;
    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).json({ error: "User doesn't exist!" });
    res.json({ data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId || req.user?._id;
    const { name, phone, address } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User doesn't exist!" });

    if (name != null) user.name = name;
    if (phone != null) user.phone = phone;
    if (address != null) user.address = address;

    const saved = await user.save();
    res.json({ message: 'Profile updated!', data: saved });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Something went wrong' });
  }
};

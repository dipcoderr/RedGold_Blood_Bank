const Blood = require('../models/Blood');

exports.getAllBlood = async (req, res) => {
  try {
    const blood = await Blood.find().lean();
    res.json({ data: blood });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.addBlood = async (req, res) => {
  try {
    const { group, price } = req.body;

    // allow price=0; only reject null/undefined or missing group
    if (!group || price == null) {
      return res.status(422).json({ error: "All fields are mandatory!" });
    }

    const existing = await Blood.findOne({ group }).lean();
    if (existing) {
      return res.status(422).json({ error: "Blood group already exists!" });
    }

    await Blood.create({ group, price });

    const bloods = await Blood.find()
      .sort({ group: 1 })
      .lean();

    return res.json({ message: "Blood group added successfully!", data: bloods });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

exports.deleteBlood = async (req, res) => {
  try {
    const { bloodId } = req.params;

    const blood = await Blood.findById(bloodId);
    if (!blood) {
      return res.status(404).json({ error: "Blood group doesn't exist!" });
    }

    await Blood.deleteOne({ _id: bloodId });

    const bloods = await Blood.find().sort({ group: 1 }).lean();

    return res.json({ message: "Blood group deleted!", data: bloods });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

const Vendor = require("./../database/models/vendor");

//Create new vendor
const createVendor = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newVendor = new Vendor({ name, email, phone }); //Vendor.create()
    await newVendor.save();
    return res
      .status(201)
      .json({ message: "Vendor Profile created ", newVendor });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getVendor = async (req, res) => {
  const { id } = req.params;

  try {
    const vendorDetails = await Vendor.findById(id).populate("venues").exec();

    if (!vendorDetails) {
      return res.status(404).json({ message: "Vendor does not exist" });
    } else {
      return res
        .status(200)
        .json({ message: "Vendor Profile retrieved", vendorDetails });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
module.exports = { createVendor, getVendor };

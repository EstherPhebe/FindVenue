const Venue = require("./../database/models/venue");
const Vendor = require("./../database/models/vendor");

const createVenue = async (req, res) => {
  const { vendorId } = req.params;

  try {
    const getVendor = await Vendor.findById(vendorId).exec();
    if (!getVendor) {
      return res.status(404).json({ message: "Vendor does not exist" });
    }
    const venueData = {
      name: req.body.name,
      location: {
        type: "Point",
        coordinates: req.body.coordinates,
      },
      state: req.body.state,
      localGA: req.body.localGA,
      street: req.body.street,
      size: req.body.size,
      features: req.body.features,
      priceperhour: req.body.priceperhour,
      vendor: getVendor._id,
    };
    const newVenue = new Venue(venueData);
    await newVenue.save();
    getVendor.venues.push(newVenue);
    await getVendor.save();
    res.status(201).json({ message: "Venue created", newVenue });
  } catch (error) {
    res.status(400).json({ message: "Could not create venue", error });
  }
};

//Get all vendors venue
const getvendorsVenues = async (req, res) => {
  const { id } = req.params;
  try {
    const vendorDetails = await Vendor.findById(id).populate("venues").exec();

    if (!vendorDetails) {
      return res.status(404).json({ message: "Vendor does not exist" });
    } else {
      const venues = vendorDetails.venues;
      return res
        .status(200)
        .json({ message: "Vendor Profile retrieved", venues });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

//vendor/:vendorId/venue

module.exports = { createVenue, getvendorsVenues };

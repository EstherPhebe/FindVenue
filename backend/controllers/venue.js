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

//Update a Venue
const updateVenue = async (req, res) => {
  const {
    name,
    state,
    localGA,
    street,
    size,
    features,
    priceperhour,
    coordinates,
  } = req.body;
  const { id, vendorId } = req.params;
  try {
    const venueDetails = await Venue.findById(id);
    const vendor = await Vendor.findById(vendorId).populate("venues").exec();

    if (!venueDetails.vendor.equals(vendorId)) {
      return res.status(404).json({ error: "Cannot perform action" });
    } else if (!venueDetails && !vendor) {
      return res.status(404).json({ message: "Venue not found" });
    } else {
      venueDetails.name = name || req.body.name;
      venueDetails.state = state || req.body.state;
      venueDetails.localGA = localGA || req.body.localGA;
      venueDetails.street = street || req.body.street;
      venueDetails.size = size || req.body.size;
      venueDetails.features = features || req.body.features;
      venueDetails.priceperhour = priceperhour || req.body.priceperhour;
      venueDetails.location = {
        type: "Point",
        coordinates: coordinates || req.body.coordinates,
      };

      await venueDetails.save();
      const checkVenue = vendor.venues.some((v) => v._id.equals(id));

      if (!checkVenue) {
        vendor.venues.push(venueDetails);
        await vendor.save();
        //maybe model middleware that checks if the ObjectID exists in the venues array
        //like a pre('save'). Unique Venue IDs for each vendor
      }
      return res.status(200).json({ message: "Venue Updated", venueDetails });
    }
  } catch (error) {
    res.status(500).json(error);
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
      return res.status(200).json({ message: "All Vendor venues", venues });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

//Delete venue
const deleteVenue = async (req, res) => {
  const { id, vendorId } = req.params;
  try {
    const venue = await Venue.findById(id);
    const vendor = await Vendor.findById(vendorId).populate("venues").exec();
    if (!venue.vendor.equals(vendorId)) {
      return res.status(404).json({ error: "Cannot perform action" });
    }
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    const venuetoDelete = await Venue.findByIdAndDelete(id).exec();
    const venues = vendor.venues;
    const index = venues.findIndex((v) => v._id.equals(id));
    venues.splice(index, 1);

    await vendor.save();

    return res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

//vendor/:vendorId/venue

module.exports = { createVenue, getvendorsVenues, updateVenue, deleteVenue };

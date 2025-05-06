const Event = require("./../database/models/event");
const Venue = require("./../database/models/venue");

//book a venue for an event
//
const bookEvent = async (req, res) => {
  const { venueId, userId } = req.params;
  try {
    const { name, date, duration } = req.body;
    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res
        .status(404)
        .json({ success: false, message: "Venue not found" });
    }
    const cost = duration * venue.priceperhour;
    const event = new Event({
      name,
      date,
      duration,
      cost,
      user: userId,
      venue: venueId,
    });
    await event.save();
    venue.events.unshift(event._id);
    await venue.save();
    return res
      .status(201)
      .json({ success: true, eventId: event._id, price: event.cost });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { bookEvent };

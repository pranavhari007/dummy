const Slot = require('../models/Slot');
const Venue = require('../models/Venue');

// @desc    Get slots for a venue
// @route   GET /api/slots/venue/:venueId
// @access  Public
const getSlotsByVenue = async (req, res) => {
  try {
    const { date } = req.query;
    let query = { venueId: req.params.venueId };
    
    if (date) {
      // Assuming date string is YYYY-MM-DD
      const startDate = new Date(date);
      startDate.setUTCHours(0,0,0,0);
      const endDate = new Date(date);
      endDate.setUTCHours(23,59,59,999);
      query.date = { $gte: startDate, $lte: endDate };
    }

    const slots = await Slot.find(query).sort({ startTime: 1 });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create slots (Batch creation)
// @route   POST /api/slots
// @access  Private/Owner
const createSlots = async (req, res) => {
  try {
    const { venueId, date, slotsData } = req.body; 
    // slotsData = [{ startTime, endTime, price }]

    // Check if venue exists and belongs to user
    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    if (venue.ownerId.toString() !== req.user.id && !req.user.roles.includes('admin')) {
      return res.status(403).json({ message: 'Not authorized to create slots for this venue' });
    }

    const newSlots = slotsData.map(slot => ({
      venueId,
      date: new Date(date),
      startTime: slot.startTime,
      endTime: slot.endTime,
      price: slot.price || venue.pricePerHour,
      status: 'available'
    }));

    // Use insertMany to batch create
    const createdSlots = await Slot.insertMany(newSlots, { ordered: false });
    
    res.status(201).json(createdSlots);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Block a slot manually
// @route   PUT /api/slots/:id/block
// @access  Private/Owner
const blockSlot = async (req, res) => {
  try {
    const { reason } = req.body;
    const slot = await Slot.findById(req.params.id).populate('venueId');

    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (slot.venueId.ownerId.toString() !== req.user.id && !req.user.roles.includes('admin')) {
      return res.status(403).json({ message: 'Not authorized to block this slot' });
    }

    if (slot.status === 'booked' || slot.status === 'locked') {
      return res.status(400).json({ message: `Cannot block a slot that is currently ${slot.status}` });
    }

    slot.status = 'blocked';
    slot.blockReason = reason || 'Manual Block by Owner';
    
    await slot.save();

    res.json(slot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSlotsByVenue,
  createSlots,
  blockSlot
};

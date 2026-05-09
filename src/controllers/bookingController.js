const Booking = require('../models/Booking');
const Slot = require('../models/Slot');
const Venue = require('../models/Venue');

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const { venueId, slotIds, paymentType, paidAmount } = req.body;

    if (!slotIds || slotIds.length === 0) {
      return res.status(400).json({ message: 'No slots selected' });
    }

    // 1. Validate that ALL slots exist and are 'available'
    const slots = await Slot.find({ _id: { $in: slotIds } });
    
    if (slots.length !== slotIds.length) {
      return res.status(400).json({ message: 'One or more slots do not exist' });
    }

    const unavailableSlots = slots.filter(slot => slot.status !== 'available');
    
    if (unavailableSlots.length > 0) {
      return res.status(400).json({ 
        message: 'Slot already booked or unavailable', 
        unavailableSlots 
      });
    }

    // 2. Calculate totals
    const totalAmount = slots.reduce((acc, slot) => acc + slot.price, 0);

    // 3. Validate payment
    if (paymentType === 'advance') {
      const minAdvance = 100 * slots.length;
      if (paidAmount < minAdvance) {
        return res.status(400).json({ message: `Advance payment must be at least ₹${minAdvance}` });
      }
    } else if (paymentType === 'full') {
      if (paidAmount < totalAmount) {
        return res.status(400).json({ message: `Full payment must be ₹${totalAmount}` });
      }
    }

    const remainingAmount = totalAmount - paidAmount;

    // 4. Update Slot Statuses (only after validation passes)
    await Slot.updateMany(
      { _id: { $in: slotIds } },
      { $set: { status: 'booked' } }
    );

    // 5. Create Booking
    const booking = await Booking.create({
      userId: req.user.id,
      venueId,
      slotIds,
      totalAmount,
      paymentType,
      paidAmount,
      remainingAmount,
      bookingStatus: 'confirmed',
      paymentStatus: 'completed' // MVP mock
    });

    res.status(201).json(booking);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings/my
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('venueId', 'name location')
      .populate('slotIds', 'date startTime endTime price status');
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get bookings for owner's venues
// @route   GET /api/bookings/owner
// @access  Private/Owner
const getOwnerBookings = async (req, res) => {
  try {
    // Find venues owned by this user
    const venues = await Venue.find({ ownerId: req.user.id }).select('_id');
    const venueIds = venues.map(v => v._id);

    const bookings = await Booking.find({ venueId: { $in: venueIds } })
      .populate('userId', 'name phone playNowId')
      .populate('venueId', 'name')
      .populate('slotIds', 'date startTime endTime status');

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel a booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('slotIds');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Ensure user is the one who booked it
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    if (booking.bookingStatus === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    // Calculate time difference
    // Assume the first slot dictates the start time
    // Sort slots by date and startTime
    const sortedSlots = booking.slotIds.sort((a, b) => {
      const dateA = new Date(`${a.date.toISOString().split('T')[0]}T${a.startTime}`);
      const dateB = new Date(`${b.date.toISOString().split('T')[0]}T${b.startTime}`);
      return dateA - dateB;
    });

    const firstSlot = sortedSlots[0];
    const matchTime = new Date(`${firstSlot.date.toISOString().split('T')[0]}T${firstSlot.startTime}`);
    
    const now = new Date();
    const hoursDifference = (matchTime - now) / (1000 * 60 * 60);

    let cancellationFee = 0;
    let refundAmount = booking.paidAmount;

    // Check if within 4 hours
    if (hoursDifference > 0 && hoursDifference <= 4) {
      // 10% cancellation fee on total amount
      cancellationFee = booking.totalAmount * 0.10;
      refundAmount = booking.paidAmount - cancellationFee;
      
      // If advance was less than the 10% fee, refund is 0 and they might owe money (but we cap at 0 for now)
      if (refundAmount < 0) refundAmount = 0;
    } else if (hoursDifference <= 0) {
      return res.status(400).json({ message: 'Cannot cancel after the match has started' });
    }

    // Update booking
    booking.bookingStatus = 'cancelled';
    booking.cancellationFee = cancellationFee;
    booking.refundAmount = refundAmount;
    booking.paymentStatus = 'refunded';
    
    await booking.save();

    // Release slots back to available
    const slotIds = booking.slotIds.map(slot => slot._id);
    await Slot.updateMany(
      { _id: { $in: slotIds } },
      { $set: { status: 'available' } }
    );

    res.json({
      message: 'Booking cancelled successfully',
      booking
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getOwnerBookings,
  cancelBooking
};

const express = require('express');
const router = express.Router();
const { getSlotsByVenue, createSlots, blockSlot } = require('../controllers/slotController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.route('/')
  .post(protect, authorizeRoles('owner', 'admin'), createSlots);

router.route('/venue/:venueId')
  .get(getSlotsByVenue);

router.route('/:id/block')
  .put(protect, authorizeRoles('owner', 'admin'), blockSlot);

module.exports = router;

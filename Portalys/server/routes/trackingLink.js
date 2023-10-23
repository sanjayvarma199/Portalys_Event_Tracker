const express = require('express');
const router = express.Router();
const TrackingLink = require('../models/trackingLink.js');

router.get("/tracking-links", async (req, res) => {
  try {
    const trackingLinks = await TrackingLink.find();
    res.json(trackingLinks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tracking links" });
  }
});

// Create a new tracking link
router.post('/generate-link', async (req, res) => {
  try {
    const { linkIdentifier } = req.body;

    // Check if the link identifier already exists
    const existingLink = await TrackingLink.findOne({ linkIdentifier });

    if (existingLink) {
      return res.status(400).json({ error: 'Link identifier already exists' });
    }

    const trackingLink = `http://localhost:8080/api/${linkIdentifier}`;
    const newTrackingLink = new TrackingLink({ linkIdentifier, trackingLink });
    await newTrackingLink.save();
    res.json({ trackingLink });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate tracking link' });
  }
});

// Get all tracking links
router.get('/:linkIdentifier', async (req, res) => {
  try {
    const { linkIdentifier } = req.params;
    const trackingLink = await TrackingLink.findOne({ linkIdentifier });
    if (!trackingLink) {
      return res.status(404).json({ error: 'Tracking link not found' });
    }

    // Increment the click count
    trackingLink.clickCount += 1;
    await trackingLink.save();

    // Redirect to the original URL (http://portalys.io)
    return res.redirect('http://portalys.io');
  } catch (error) {
    res.status(500).json({ error: 'Failed to perform redirection' });
  }
});

// Delete a tracking link by ID
router.delete('/delete-link/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLink = await TrackingLink.findByIdAndDelete(id);
    if (!deletedLink) {
      return res.status(404).json({ error: "Tracking link not found" });
    }
    res.json({ message: "Tracking link deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete tracking link" });
  }
});

module.exports = router;

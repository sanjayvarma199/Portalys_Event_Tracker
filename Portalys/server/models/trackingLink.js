const mongoose = require('mongoose');

const trackingLinkSchema = new mongoose.Schema({
  linkIdentifier: { type: String, unique: true },
  trackingLink: String,
  clickCount: { type: Number, default: 0 },
});

const TrackingLink = mongoose.model('TrackingLink', trackingLinkSchema);

module.exports = TrackingLink;

const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    subscriptionId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true }, // Duration in days
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    notificationSent: { type: Boolean, default: false },
    notifyDays: { type: Number, default: 3 } // Days before expiry to notify
});

module.exports = mongoose.model('Subscription', subscriptionSchema);

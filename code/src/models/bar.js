// src/models/bar.js
const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    openingHours: { type: String, required: true },
    userId: { type: String, required: true },
    share: { type: Boolean, required: true }
});

const Bar = mongoose.model('Bar', barSchema); // 'Bar' è il nome del modello e barSchema è lo schema che hai definito

module.exports = Bar;

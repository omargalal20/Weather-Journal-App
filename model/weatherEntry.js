const mongoose = require('mongoose');

const weatherEntrySchema = new mongoose.Schema({
    date: {
        type: Date
    },
    city: {
        type: String
    },
    temp: {
        type: Number
    },
    feeling: {
        type: String
    }
});

const weatherEntry = mongoose.model('WeatherEntry', weatherEntrySchema);

module.exports = weatherEntry;
const mongoose = require("mongoose");

const AirSchema = new mongoose.Schema({
  name: { type: String, required: true },
  summary: String,
  neighborhood: String,
  property_type: String,
  room_type: String,
  accommodates: Number,
  bedrooms: Number,
  beds: Number,
  price: Number
}, { timestamps: true });

module.exports = mongoose.model("Airbnb", AirSchema);

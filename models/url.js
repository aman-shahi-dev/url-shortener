const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;

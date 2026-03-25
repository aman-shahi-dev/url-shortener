const mongoose = require("mongoose");

async function connectDB(url) {
  await mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected!!!"))
    .catch((error) => console.log(`MongoDB connection error ::`, error));
}

module.exports = {
  connectDB,
};

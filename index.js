require("dotenv").config();
const express = require("express");
const urlRoute = require("./routes/url");
const { connectDB } = require("./config/dbConnection");

const app = express();
const PORT = 5000;

connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use("/shorten", urlRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

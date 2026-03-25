const express = require("express");
const urlRoute = require("./routes/url");
const { connectDB } = require("./config/dbConnection");

const app = express();
const PORT = 5000;

connectDB("mongodb://127.0.0.1:27017/url-shortener");

app.use(express.json());
app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const urlRoute = require("./routes/url");
const { connectDB } = require("./config/dbConnection");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use("/shorten", urlRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

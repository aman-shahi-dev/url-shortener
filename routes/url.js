const express = require("express");
const {
  handleGenerateNewShortURL,
  handleVisitRedirectURL,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.get("/:shortId", handleVisitRedirectURL);
router.post("/", handleGenerateNewShortURL);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;

const express = require("express");
const {
  handleGenerateNewShortURL,
  handleVisitRedirectURL,
  handleUpdateUrl,
  handleDeleteUrl,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router
  .route("/:shortCode")
  .get(handleVisitRedirectURL)
  .put(handleUpdateUrl)
  .delete(handleDeleteUrl);

router.get("/:shortCode/stats", handleGetAnalytics);

module.exports = router;

const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url)
    return res.status(400).json({
      error: "url is required",
    });

  const shortID = nanoid(8);

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.status(201).json({
    id: shortID,
  });
}

async function handleVisitRedirectURL(req, res) {
  const shortID = req.params.shortId;
  console.log("Short ID: ", shortID);
  const entry = await URL.findOneAndUpdate(
    { shortId: shortID },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );

  res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res) {
  const shortID = req.params.shortId;
  const result = await URL.findOne({ shortId: shortID });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleVisitRedirectURL,
  handleGetAnalytics,
};

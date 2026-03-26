const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  try {
    const body = req.body;
    if (!body || !body.url)
      return res.status(400).json({
        error: "url is required",
      });

    const existingUrl = await URL.findOne({ url: body.url });

    if (existingUrl) {
      return res.status(200).json({
        message: "URL already exists in database",
        existingUrl,
      });
    }

    const shortID = nanoid(8);

    const newUrl = await URL.create({
      shortCode: shortID,
      url: body.url,
      visitHistory: [],
    });

    if (!newUrl) {
      return res.status(400).json({
        message: "error while creating the url",
      });
    }

    return res.status(201).json({
      id: newUrl._id,
      url: body.url,
      shortCode: shortID,
      createdAt: newUrl.createdAt,
      updatedAt: newUrl.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function handleVisitRedirectURL(req, res) {
  try {
    const shortCode = req.params.shortCode;
    const entry = await URL.findOneAndUpdate(
      { shortCode: shortCode },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
    );

    if (!entry) {
      return res.status(404).json({
        message: "no url found for this shortCode",
      });
    }

    // return res.status(200).json({
    //   id: entry._id,
    //   url: entry.url,
    //   shortCode: entry.shortCode,
    //   createdAt: entry.createdAt,
    //   updatedAt: entry.updatedAt,
    // });

    let destinationUrl = entry.url;
    if (
      !destinationUrl.startsWith("http://") ||
      !destinationUrl.startsWith("https://")
    ) {
      destinationUrl = "http://" + destinationUrl;
    }
    res.redirect(destinationUrl);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function handleUpdateUrl(req, res) {
  try {
    const body = req.body;
    const shortCode = req.params.shortCode;

    if (!body || !body.url) {
      return res.status(400).json({
        message: "validation error :: url is required",
      });
    }

    const updatedEntry = await URL.findOneAndUpdate(
      {
        shortCode: shortCode,
      },
      {
        url: body.url,
      },
      {
        new: true,
      },
    );

    if (!updatedEntry) {
      return res.status(404).json({
        message: "updation error :: shortCode not found",
      });
    }

    return res.status(200).json({
      id: updatedEntry._id,
      url: updatedEntry.url,
      shortCode: updatedEntry.shortCode,
      createdAt: updatedEntry.createdAt,
      updatedAt: updatedEntry.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function handleDeleteUrl(req, res) {
  try {
    const shortCode = req.params.shortCode;

    const deletedDocument = await URL.findOneAndDelete({
      shortCode: shortCode,
    });

    if (!deletedDocument) {
      return res.status(404).json({
        message: "Deletion error :: shortCode not found",
      });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function handleGetAnalytics(req, res) {
  try {
    const shortCode = req.params.shortCode;
    const result = await URL.findOne({ shortCode: shortCode });

    if (!result) {
      return res.status(404).json({
        message: "No stats found!!!",
      });
    }
    return res.json({
      id: result._id,
      url: result.url,
      shortCode: result.shortCode,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      accessCount: result.visitHistory.length,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleVisitRedirectURL,
  handleUpdateUrl,
  handleDeleteUrl,
  handleGetAnalytics,
};

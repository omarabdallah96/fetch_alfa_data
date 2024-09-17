const express = require("express");
const { chromium } = require("playwright"); // Importing Playwright
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Express route to handle Playwright automation


// Start Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

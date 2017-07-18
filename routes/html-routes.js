// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads main-page.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main-page.html"));
  });

  // donate route loads donate.html
  app.get("/sale", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/donate.html"));
  });

  // adopt route loads adopt.html
  app.get("/purchase", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/adopt.html"));
  });


};

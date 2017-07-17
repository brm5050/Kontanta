// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/petdetails", function(req, res) {
    var query = {};
    if (req.query.pet_id) {
      query.petId = req.query.pet_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Post.findAll({
      where: query,
      include: [db.pets]
    }).then(function(dbpetdetails) {
      res.json(dbpetdetails);
    });
  });

  // Get rotue for retrieving a single post
  app.get("/api/petdetails/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.petdetails.findOne({
      where: {
        id: req.params.id
      },
      include: [db.pets]
    }).then(function(dbpetdetails) {
      res.json(dbpetdetails);
    });
  });

//  POST route for saving a new post

  app.post("/api/petdetails", function(req, res) {
    db.petDetails.create(req.body).then(function(dbpetdetails) {
      res.json(dbpetdetails);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/petdetails/:id", function(req, res) {
    db.petdetails.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbpetdetails) {
      res.json(dbpetdetails);
    });
  });

  // PUT route for updating posts
  app.put("/api/petdetails", function(req, res) {
    db.petdetails.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbpetdetails) {
        res.json(dbpetdetails);
      });
  });
};

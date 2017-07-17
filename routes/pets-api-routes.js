var db = require("../models");

module.exports = function(app) {
  
  app.get("/api/pets", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    db.pets.findAll({
      include: [db.pets]
    }).then(function(dbpets) {
      res.json(dbpets);
    });
  });

app.get("/api/pets/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
   
    db.pets.findOne({
      where: {
        id: req.params.id
      },
      include: [db.petdetails]
    }).then(function(dbpets) {
      res.json(dbpets);
    });
  });


  app.post("/api/pets", function(req, res) {
    db.pets.create(req.body).then(function(dbpets) {
      res.json(dbpets);
    });
  });


  app.delete("/api/pets/:id", function(req, res) {
    db.pets.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbpets) {
      res.json(dbpets);
    });
  });

};

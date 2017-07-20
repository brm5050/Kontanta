
var db = require("../models");
var express = require("express");
var router = express.Router();

//Import the model(petDetails.js) to use its database functions.
var petDetails = require("../models/petDetails.js");

// router.get("/", function(req, res) {
// 	res.redirect("/petDetails");
// });

//Create all our routes and set up logi within those routes where required.
router.get("/purchase" , function(req, res) {
	//get all petDetails from DB
	db.petDetails.findAll({}).then(function(data){
		var hbsObject = {
			petDetails: data
		};

		res.render("index", hbsObject);
	});
});


router.post("/petDetails/create", function(req, res) {
  console.log("Creating petDetails");
  console.log(req.body);
 db.petDetails.create(req.body).then(function() {
    res.redirect("/");
  });

});


router.put("/petDetails/:id/update", function(req, res) {
  console.log("route---- /burger/:id/update")
   console.log(req.body);
   console.log(req.params);
   var petDetailsId = "id = " + req.params.id;
   db.petDetails.update({stock : 0}, {where : {id:req.params.id}}).then(function() {
    res.redirect("/");
  });

});


//Export routes for server.js to use
module.exports = router;


var db = require("../models");
var express = require("express");
var router = express.Router();

//Import the model(petDetails.js) to use its database functions.
var petDetails = require("../models/petDetails.js");
var purchaseDetails = require("../models/purchaseDetails.js");


//this route is good
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


router.get("/purchase/:id", function(req, res) {
    db.petDetails.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbpets) {
     var hbsObjectIndividual = {
      petDetailsInfo: dbpets.dataValues
      };
     res.render("purchaseid", hbsObjectIndividual);
    });
  });


  // router.post("/complete/purchase", function(req, res) {
  //   console.log(req.body);
  //   db.purchaseDetails.create(req.body).then(function(dbpurchasedetails) {
  //     res.json(dbpurchasedetails);
  //     // console.log(dbpurchasedetails);
  //     var newPurchaseid = dbpurchasedetails.id;
  //     res.redirect("/thankyou/"+ newPurchaseid);
  //         });

  // });


//------------------------------------------------


  //need to check for stock update-------Need to work on it---------------------

router.post("/complete/purchase", function(req, res) {
    console.log(req.body);
    db.purchaseDetails.findOne({where: {id: req.body.id}}).then(function(dbpurchasedetails) {
    db.purchaseDetails.update({stock : dbpurchasedetails.stock-1}, {where : {id:req.body.id}}).then(function(dbpurchasedetails) {
      var newPurchaseid = dbpurchasedetails.id;
      console.log("testtesttest");
      res.redirect("/thankyou/"+ newPurchaseid);
    });
  
          });

  });

//------------------------------------------------


// router.get("/complete/purchase", function(req, res){
//   res.send("Hello thanks for ordering...");
// })



router.get("/thankyou/:id", function(req, res){
      db.petDetails.findOne({
      where: {
        id: req.params.id
      }
      }).then(function(dbpets) {
     var hbsObjectIndividual = {
      petDetailsInfo: dbpets.dataValues
      };
     res.render("thankyouadoption", hbsObjectIndividual);
    });
  });

// router.get("/api/petDetails", function(req, res){
//   res.render("thankyoudonation")
// })

router.post("/api/purchaseDetails", function(req, res) {
    db.purchaseDetails.create(req.body).then(function(dbpurchasedetails) {
      res.json(dbpurchasedetails);
    });
  });




//this route is good
// router.post("/petDetails/create", function(req, res) {
//  db.petDetails.create(req.body).then(function() {
//     res.redirect("/");
//   });

// });


router.put("/petDetails/:id/update", function(req, res) {
   var petDetailsId = "id = " + req.params.id;
   db.petDetails.update({stock : 0}, {where : {id:req.params.id}}).then(function() {
    res.redirect("/");
  });

});


//Export routes for server.js to use
module.exports = router;

var db = require("../models");
var express = require("express");
var router = express.Router();

//Import the model(petDetails.js) to use its database functions.
var petDetails = require("../models/petDetails.js");
var purchaseDetails = require("../models/purchaseDetails.js");


router.get("/", function(req, res) {
  res.render("home");
});

router.get("/sale", function(req, res) {
  res.render("donate");
});



//========Test:1===This route use after entering all petdetails and go to thankyoudonation page======


  router.post("/api/petDetails", function(req, res) {
    db.petDetails.create(req.body).then(function(dbpetdetails) {
      
    var newPet = req.body;

    // var file = req.files;
    console.log("req",req);
    console.log("req.body", req.body);
    console.log("req.files", req.files);
    console.log("req.body.image", req.body.image);


     if(!req.files){
     // res.send("No File Uploaded");
     
    }else{
     var file = req.files.sampleFile;

    var extension = path.extname(file.name);
     extension = extension.toLowerCase();
     console.log(extension);

    if(extension !== ".png" && extension !== ".gif" && extension !== ".jpg" && extension !== ".jpeg" && extension !== ".pdf"){
      res.send("Only images are acceptable");
    }else{
       // file.mv(__dirname + "/uploadedimages/" + file.name, function(err){

        if(err){
        res.status(500).send(err);

        }else{
           db.petDetails.create(newPet).then(function(dbpetdetails) {
            var newPetID = dbpetdetails.id;
            // res.redirect("/dontationdone");
            res.json({"sucess":true});
          });
        
        }

       // })
       }
     }
      res.render('thankyoudonation');
    });
  });


//======Test1 ends=======================





//=================(after clicking 'Adopt' button)============

router.get("/purchase" , function(req, res) {
	//get all petDetails from DB
	db.petDetails.findAll({}).then(function(data){
		var hbsObject = {
			petDetails: data
		};
		res.render("index", hbsObject);
	});
});

//================= END - (after clicking 'Adopt' button)============



//===================(after clicking 'Adopt Me' button)===========

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
//===========END - (after clicking 'Adopt Me' button)





//==========Test13 : Need to work on this route=================
//=======(after fill-in purchase info + Clicking 'Submit' button)=========
//===========This is hidden route-- I can not see it but it happens

  router.post("/complete/purchase",function(req, res) {
    console.log(req.body);
    db.purchaseDetails.create(req.body).then(function(dbpurchasedetails) {
      //to display purchasedetails
      //res.json(dbpurchasedetails);
      // console.log(dbpurchasedetails);
      //var newPurchaseid = dbpurchasedetails.id;
      res.redirect("/thankyou/"+ dbpurchasedetails.id);
          });

  });

//=======================Test13 Finish here===================================


//===========This routes takes you to Thank you for adoption page========
router.get("/thankyou/:id", function(req, res){
      db.petDetails.findOne({
      where: {
        id: req.params.id
      }
      }).then(function(dbpets) {
     var hbsObjectIndividual = {
      petDetailsInfo: dbpets
      };
     res.render("thankyouadoption", hbsObjectIndividual);
    });
  });
//===========This routes takes you to Thank you for adoption page========



//Export routes for server.js to use
module.exports = router;

var Sequelize = require('sequelize');
//var sequelize = require

module.exports = function(sequelize, DataTypes) {

  var purchaseDetails = sequelize.define('purchaseDetails', {
    firstName : {
      type : Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    },

    lastName : {
      type : Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    },

    ccNumber : {
      type : Sequelize.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    cvv : {
      type : Sequelize.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 3]
      }
    },

    mmyy : {
      type : Sequelize.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 4]
      }
    },

    address : {
      type : Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    },

    city : {
      type : Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    },

    state : {
      type : Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    },


    zipcode : {
      type : Sequelize.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 5]
      }
    },

    price : {
      type : Sequelize.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 5]
      }
    }
  });


  purchaseDetails.associate = function(models) {
      // We're saying that a petDetails should belong to pets
      // A petDetails can't be created without an pet due to the foreign key constraint
    purchaseDetails.belongsTo(models.petDetails, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return purchaseDetails;
};





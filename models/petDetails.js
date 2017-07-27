var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {

  var petDetails = sequelize.define("petDetails", {
    petName : {
      type : Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    },
    	
    petDescription : {
      type : Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 151]
      }
    },

    age : {
      type : Sequelize.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 2]
      }
    },

    gender : {
      type : Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    },

    price : {
      type : Sequelize.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 11]
      }
  	},

    stock : {
      type : Sequelize.BOOLEAN,
      allowNull: false,
      validate: {
        len: [1]
      }
  	},

    img: {
      type: Sequelize.BLOB,
      allowNull: true
    },

    vaccinated: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  petDetails.associate = function(models) {
      // We're saying that a petDetails should belong to pets
      // A petDetails can't be created without an pet due to the foreign key constraint
      petDetails.belongsTo(models.pets, {
        foreignKey: {
          allowNull: false
        }
      });
  };

  petDetails.associate = function(models) {
    // Associating pets with petDetails
    // When an pets is deleted, also delete any associated petDetails
    petDetails.hasOne(models.purchaseDetails, {
      onDelete: "cascade"
    });
  };

  return petDetails;
};





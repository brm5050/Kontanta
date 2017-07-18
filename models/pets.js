var Sequelize = require('sequelize');
//var sequelize = require

module.exports = function(sequelize, DataTypes) {

var pets = sequelize.define('pets', {
pettype : {
  type : Sequelize.STRING,
  allowNull: false,

  validate: {
        len: [1, 51]
      }
	},

});


pets.associate = function(models) {
    // Associating pets with petDetails
    // When an pets is deleted, also delete any associated petDetails
    pets.hasMany(models.petDetails, {
      onDelete: "cascade"
    });
};

return pets;

};



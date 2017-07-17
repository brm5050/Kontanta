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
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    pets.hasMany(models.petDetails, {
      onDelete: "cascade"
    });
};

return pets;

};







'use strict';
module.exports = (sequelize, DataTypes) => {
  var clockedin = sequelize.define(
    'clockedin',
    {
     
      FirstName: DataTypes.STRING,
      LastName: DataTypes.STRING,
    
    },
  
  );

  return clockedin;
};
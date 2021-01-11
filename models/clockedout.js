



'use strict';
module.exports = (sequelize, DataTypes) => {
  var clockedout = sequelize.define(
    'clockedout',
    {
     
      FirstName: DataTypes.STRING,
      LastName: DataTypes.STRING,
      
    },
  
  );

  return clockedout;
};

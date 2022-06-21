const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      primaryKey: true,
      type : DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING(800),
      allowNull: false
    },
    released:{
      type: DataTypes.STRING,
      allowNull: true
    },
    rating:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    platforms:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    image:{
    type: DataTypes.STRING,
    allowNull: true
    },
    CreateDB:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }


  },{ freezeTableName: true});
};

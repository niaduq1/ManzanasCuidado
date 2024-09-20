'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    document_type:{
      type: DataTypes.ENUM('Cedula de ciudadania', 'Cedula de extranjeria', 'Tarjeta de identidad'),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ocupation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    services: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      },
      set(value){
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue("password", hash);
      }
    }
  },{
    sequelize,
    paranoid: true,
    modelName: 'User',
  });
  return User;
};
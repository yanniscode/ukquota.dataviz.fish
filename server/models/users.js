/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id_user: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_firstname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    user_lastname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    login: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    mail: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false
    }
  }, {
    tableName: 'users'
  });
};

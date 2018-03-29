/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zones', {
    id_zone: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name_zone: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    tableName: 'zones',
    timestamps: false
  });
};


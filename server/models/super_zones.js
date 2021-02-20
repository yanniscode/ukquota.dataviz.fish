/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('super_zones', {
    id_super_zone: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    super_zone: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    sz_coord: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'super_zones'
  });
};

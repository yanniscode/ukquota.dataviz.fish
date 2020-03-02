/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fishzone_join', {
    id_fishzone_join: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_specie: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'species',
        key: 'id_specie'
      }
    },
    id_super_zone: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'super_zones',
        key: 'id_super_zone'
      }
    },
    id_zone: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'zones',
        key: 'id_zone'
      }
    }
  }, {
    tableName: 'fishzone_join'
  });
};
